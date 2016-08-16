defmodule Ultimatum.Main do
  alias Ultimatum.Actions

  @game_modes ["ultimatum", "dictator"]
  @pages ["waiting", "description", "experiment", "result"]

  def game_modes, do: @game_modes
  def pages, do: @pages

  def wrap(data) do
    {:ok, %{"data" => data}}
  end
end
