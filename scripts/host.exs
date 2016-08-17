defmodule Ultimatum.Host do
  alias Ultimatum.Main
  alias Ultimatum.Actions

  # Actions
  def fetch_contents(data) do
    data
    |> Actions.update_host_contents()
  end

  def prev_page(data) do
    index = Enum.find_index(Main.pages, fn(x) ->
    x == data.page end)
    next = Enum.at(Main.pages, index - 1)
    %{data | page: next} 
    |> Actions.change_page(next)
  end

  def next_page(data) do
    index = Enum.find_index(Main.pages, fn(x) ->
    x == data.page end)
    next = Enum.at(Main.pages, rem(index + 1, length(Main.pages)))
    %{data | page: next} 
    |> Actions.change_page(next)
  end

  def change_game_round(data, game_round) do
    %{data | game_round: game_round}
    |> Actions.change_game_round(game_round)
  end

  def change_game_mode(data, game_mode) do
    %{data | game_mode: game_mode }
    |> Actions.change_game_mode(game_mode)
  end

  def match(data) do
    %{participants: participants} = data
    group_size = 2
    groups_count = div(Map.size(participants), group_size)
    groups = participants
              |> Enum.map(&elem(&1, 0)) # [id...]
              |> Enum.shuffle
              |> Enum.chunk(group_size)
              |> Enum.map_reduce(0, fn(p, acc) -> {{Integer.to_string(acc), p}, acc + 1} end) |> elem(0) # [{0, p0}, ..., {n-1, pn-1}]
              |> Enum.into(%{})

    updater = fn participant, group ->
      %{ participant |
        pair: group,
        role: participant.role,
        money: participant.point
      }
    end
    reducer = fn {group, ids}, {participants, pair} ->
      participants = Enum.reduce(ids, participants, fn id, participants ->
        Map.update!(participants, id, &updater.(&1, group))
      end)
      groups = Map.put(groups, group, Main.new_pair(ids))
      {participants, groups}
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
