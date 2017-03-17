defmodule UltimatumGame do
  use XeeThemeScript
  require Logger

  alias UltimatumGame.Host
  alias UltimatumGame.Participant
  alias UltimatumGame.Main
  alias UltimatumGame.Actions

  @description """
  <h2>最後通牒ゲーム</h2>
  <h3>ルールの説明</h3>
  <p>あなたは誰かとペアになって実験を行います。<br/>参加者には2つの役割があり、今回は{round}回の役割交代があります。</p>
  <h4>提案者</h4>
  <p>提案者はポイントを自分と受け手の間でどう分けるか提案できます。</p>
  <h4>受け手</h4>
  <p>受け手は提案者の提案を承認するか拒否するか選択できます。</p>
  <p>受け手が拒否した場合、そのラウンドに提案者に配られたポイントは没収されます。</p>
  """

  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{data: %{
      description: @description,
      page: "waiting",
      game_progress: 0,
      game_round: 1,
      game_redo: 0,
      inf_redo: false,
      game_progress: 0,
      participants: %{},
      pairs: %{},
      ultimatum_results: %{},
      dictator_results: %{},
      }
    }}
  end

  def join(data, id) do
    result = unless Map.has_key?(data.participants, id) do
      new = Main.new_participant()
      put_in(data, [:participants, id], new)
    else
      data
    end
    wrap_result(data, result)
  end

  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    Logger.debug("[Ultimatum Game] #{action} #{inspect params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Host.fetch_contents(data)
      {"MATCH", _} -> Host.match(data)
      {"RESET", _} -> Host.reset(data)
      {"CHANGE_DESCRIPTION", text} -> Host.change_description(data, text)
      {"CHANGE_PAGE", page} -> Host.change_page(data, page)
      {"CHANGE_GAME_ROUND", game_round} -> Host.change_game_round(data, game_round)
      {"CHANGE_INF_REDO", inf_redo} -> Host.change_inf_redo(data, inf_redo)
      {"CHANGE_GAME_REDO", game_redo} -> Host.change_game_redo(data, game_redo)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
    Logger.debug("[Ultimatum Game] #{action} #{inspect params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Participant.fetch_contents(data, id)
      {"FINISH_ALLOCATING", allo_temp} -> Participant.finish_allocating(data, id, allo_temp)
      {"CHANGE_ALLO_TEMP", allo_temp} -> Participant.change_allo_temp(data, id, allo_temp)
      {"RESPONSE_OK", result} -> Participant.response_ok(data, id, result)
      {"REDO_ALLOCATING", _} -> Participant.redo_allocating(data, id)
      {"RESPONSE_NG", result} -> Participant.response_ng(data, id, result)
      _ -> {:ok, %{data: data}}
    end
    wrap_result(data, result)
  end

  def compute_diff(old, %{data: new} = result) do
    import Participant, only: [filter_data: 2]
    import Host, only: [filter_data: 1]
    host = Map.get(result, :host, %{})
    participant = Map.get(result, :participant, %{})
    participant_tasks = Enum.map(old.participants, fn {id, _} ->
      {id, Task.async(fn -> JsonDiffEx.diff(filter_data(old, id), filter_data(new, id)) end)}
    end)
    host_task = Task.async(fn -> JsonDiffEx.diff(filter_data(old), filter_data(new)) end)
    host_diff = Task.await(host_task)
    participant_diff = Enum.map(participant_tasks, fn {id, task} -> {id, %{diff: Task.await(task)}} end)
                        |> Enum.filter(fn {_, map} -> map_size(map.diff) != 0 end)
                        |> Enum.into(%{})
    host = Map.merge(host, %{diff: host_diff})
    host = if map_size(host.diff) == 0 do
      Map.delete(host, :diff)
    else
      host
    end
    host = if map_size(host) == 0 do
      nil
    else
      host
    end
    participant = Map.merge(participant, participant_diff, fn _k, v1, v2 ->
      Map.merge(v1, v2)
    end)
    %{data: new, host: host, participant: participant}
  end

  def wrap_result(old, {:ok, result}) do
    {:ok, compute_diff(old, result)}
  end

  def wrap_result(old, new) do
    {:ok, compute_diff(old, %{data: new})}
  end
end
