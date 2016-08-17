defmodule Ultimatum.Participant do
  alias Ultimatum.Actions

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end


  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
      game_mode: data.game_mode,
      game_round: data.game_round,
      give_point: data.give_point,
      participants: data.participants,
      pairs: data.pairs
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    format_participant(participant)
    |> Map.merge(format_data(data))
  end
end
