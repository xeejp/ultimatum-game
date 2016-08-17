defmodule Ultimatum.Main do

  @game_modes ["ultimatum", "dictator"]
  @pages ["waiting", "description", "experiment", "result"]
  @role ["proposer", "responder"]

  def game_modes, do: @game_modes
  def pages, do: @pages

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
      nowround: 1,
      proposed: false,
      answered: false,
      propose: nil,
      answer: nil
    }
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end
