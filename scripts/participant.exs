defmodule Ultimatum.Participant do
  alias Ultimatum.Actions

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end
end
