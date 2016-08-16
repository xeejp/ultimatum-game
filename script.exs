defmodule UltimatumGame do
  use Xee.ThemeScript
  require Logger

  require_file "scripts/main.exs"
  require_file "scripts/host.exs"
  require_file "scripts/participant.exs"
  require_file "scripts/actions.exs"

  alias Ultimatum.Host
  alias Ultimatum.Participant
  alias Ultimatum.Main
  alias Ultimatum.Actions

  @pages ["waiting", "description", "experiment", "result"]
  @gamemodes ["ultimatum", "dictator"]
  
  # Callbacks
  def script_type do
    :message
  end

  def install, do: nil

  def init do
    {:ok, %{"data" => %{
       page: "waiting",
       gamemode: "ultimatum",
       rounds: 1,
       participants: %{},
       pairs: %{}
     }}}
  end

  def new_participant do
    %{
      pair: nil,
      money: 0,
      role: nil,
    }
  end

  def new_pair(members) do
    %{
      members: members,
      nowround: 0,
      proposed: false,
      answered: false,
      propose: nil,
      answer: nil
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant()
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end
  
  def wrap_result({:ok, _} = result), do: result
  def wrap_result(result), do: Main.wrap(result)

  def wrap(data) do
    {:ok, %{"data" => data}}
  end

  # Host router
  def handle_received(data, %{"action" => action, "params" => params}) do
    Logger.debug("[Ultimatum Game] #{action} #{params}")
    result = case {action, params} do
      {"FETCH_CONTENTS", _} -> Host.fetch_contents(data)
      {"PREV_PAGE", _} -> Host.prev_page(data)
      {"NEXT_PAGE", _} -> Host.next_page(data)
      {"CHANGE_ROUNDS", rounds} -> Host.change_rounds(data, rounds)
      {"CHANGE_GAMEMODE", gamemode} -> Host.change_gamemode(data, gamemode)
      # {"match", _} -> Host.match(data)
      _ -> {:ok, %{"data" => data}}
    end
    wrap_result(result)
  end

  # Participant router
  def handle_received(data, %{"action" => action, "params" => params}, id) do
    Logger.debug("[Ultimatum Game] #{action} #{params}")
    result = case {action, params} do
      {"fetch contents", _} -> Participant.fetch_contents(data, id)
      _ -> {:ok, %{"data" => data}}
    end
    wrap_result(result)
  end
end
