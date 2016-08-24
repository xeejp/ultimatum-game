defmodule Ultimatum.Actions do
  alias Ultimatum.Participant
  alias Ultimatum.Host

  def change_page(data, page) do
    action = get_action("change page", page)
    format(data, nil, dispatch_to_all(data, action))
  end

  def sync_game_progress(data, game_progress) do
    action = get_action("sync game progress", game_progress)
    format(data, nil, dispatch_to_all(data, action))
  end

  def sync_participants_length(data, participants_length) do
    action = get_action("sync participants length", participants_length)
    format(data, nil, dispatch_to_all(data, action))
  end

  def change_game_round(data, game_round) do
    action = get_action("change game_round", game_round)
    format(data, nil, dispatch_to_all(data, action))
  end

  def change_game_mode(data, game_mode) do
    action = get_action("change game_mode", game_mode)
    format(data, nil, dispatch_to_all(data, action))
  end

  def change_allo_temp(data, id, allo_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
    action = get_action("change allo_temp", allo_temp)
    format(data, nil, dispatch_to(target_id, action))
  end

  def finish_allocating(data, id, allo_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
    h_action = get_action("finish allocating", pair_id)
    p_action = get_action("finish allocating", allo_temp)
    format(data, h_action, dispatch_to(target_id, p_action))
  end

  def response_ok(data, id, allo_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
    host_action = get_action("push results", %{id: id, target_id: target_id, allo_temp: allo_temp})
    target_action = get_action("response ok", allo_temp)
    format(data, host_action, dispatch_to(target_id, target_action)) 
  end

  def response_ng(data, id) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
    host_action = get_action("push results", %{id: id, target_id: target_id, allo_temp: 0})
    target_action = get_action("response ng", nil)
    format(data, host_action, dispatch_to(target_id, target_action))
  end

  def show_results(data, results) do
    action = get_action("show results", results)
    format(data, nil, dispatch_to_all(data, action))
  end

  def join(data, id, participant) do
    action = get_action("join", %{id: id, participant: participant})
    format(data, action)
  end

  def matched(%{participants: participants, pairs: pairs} = data) do
    host = get_action("matched", %{participants: participants, pairs: pairs})
    participant = Enum.map(participants, fn {id, p} ->
      unless p.pair_id == nil do
        payload = Map.merge(Participant.format_participant(p), Participant.format_pair(Map.get(pairs, p.pair_id)))
      end
      {id, %{action: get_action("matched", payload)}}
    end) |> Enum.into(%{})
    format(data, host, participant)
  end

  def update_host_contents(data) do
    host = get_action("update contents", Host.format_contents(data))
    format(data, host)
  end

  def update_participant_contents(data, id) do
    participant = dispatch_to(id, get_action("update contents", Participant.format_contents(data, id)))
    format(data, nil, participant)
  end

  # Utilities

  def get_action(type, params) do
    %{
      type: type,
      payload: params
    }
  end

  def dispatch_to(map \\ %{}, id, action) do
    Map.put(map, id, %{action: action})
  end

  def dispatch_to_all(%{participants: participants}, action) do
    Enum.reduce(participants, %{}, fn {id, _}, acc -> dispatch_to(acc, id, action) end)
  end

  def format(data, host, participants \\ nil) do
    result = %{"data" => data}
    unless is_nil(host) do
      result = Map.put(result, "host", %{action: host})
    end
    unless is_nil(participants) do
      result = Map.put(result, "participant", participants)
    end
    {:ok, result}
  end
end
