defmodule Ultimatum.Host do
  alias Ultimatum.Main
  alias Ultimatum.Actions

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def show_results(data, results) do
    Actions.show_results(data, results)
  end

  def change_page(data, page) do
    if page in Main.pages do
      %{data | page: page}
      |> Actions.change_page(page)
    else
      data
    end
  end
  def change_game_round(data, game_round) do
    if game_round < 0 do game_round = 0 end
    %{data | game_round: game_round}
    |> Actions.change_game_round(game_round)
  end

  def change_game_mode(data, game_mode) do
    %{data | game_mode: game_mode }
    |> Actions.change_game_mode(game_mode)
  end

  def match(data) do
    %{game_mode: game_mode} = data
    %{participants: participants} = data
    group_size = 2
    groups_count = div(Map.size(participants), group_size)
    groups = participants
              |> Enum.map(&elem(&1, 0)) # [id...]
              |> Enum.shuffle
              |> Enum.chunk(group_size)
              |> Enum.map_reduce(0, fn(p, acc) -> {{Integer.to_string(acc), p}, acc + 1} end) |> elem(0) # [{0, p0}, ..., {n-1, pn-1}]
              |> Enum.into(%{})

    updater = fn participant, pair_id, role ->
      %{ participant |
        role: role,
        point: 0,
        pair_id: pair_id
      }
    end
    reducer = fn {group, ids}, {participants, pairs} ->
      [id1, id2] = ids
      proposer = case game_mode do
        "ultimatum" -> "proposer"
        "dictator" -> "dictator"
      end
      participants = participants
                      |> Map.update!(id1, &updater.(&1, group, proposer))
                      |> Map.update!(id2, &updater.(&1, group, "responder"))

      pairs = Map.put(pairs, group, Main.new_pair(ids))
      {participants, pairs}
    end
    acc = {participants, %{}}
    {participants, groups} = Enum.reduce(groups, acc, reducer)

    %{data | participants: participants, pairs: groups}
    |> Actions.matched()
  end
  
  def format_contents(data) do
    data
  end
end
