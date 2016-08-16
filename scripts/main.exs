defmodule Ultimatum.Main do
  alias Ultimatum.Actions

  @game_modes ["ultimatum", "dictator"]
  @pages ["waiting", "description", "experiment", "result"]

  def game_modes, do: @game_modes
  def pages, do: @pages

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant()
      put_in(data, [:participants, id], new)
      |> Actions.join(id, new)
    else
      data
    end
  end

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end
