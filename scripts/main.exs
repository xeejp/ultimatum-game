defmodule Ultimatum.Main do

  @game_modes ["ultimatum", "dictator"]
  @pages ["waiting", "description", "experiment", "result"]
  @roles ["visitor", "proposer", "responder"]
  @states ["allocating", "judging", "finished"]

  def game_modes, do: @game_modes
  def pages, do: @pages
  def roles, do: @roles
  def states, do: @states

  def wrap(data) do
    {:ok, %{"data" => data}}
  end

  def initial do
  end

  def new_participant do
    %{
      point: 0,
      role: "visitor",
      pair_id: nil,
    }
  end

  def new_pair(members) do
    %{
      members: members,
      now_round: 1,
      allo_temp: 0,
      state: "allocating",
      results: [],
    }
  end
end
