defmodule Ultimatum.Participant do
  alias Ultimatum.Actions

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def format_pair(pair) do
    %{
      members: length(pair.members),
      nowround: pair.nowround,
      proposed: pair.proposed,
      answered: pair.answered,
      propose: pair.propose,
      answer: pair.answer
    }
  end

  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
      gamemode: data.gamemode,
      rounds: data.rounds
    }
  end

  def format_contents(data, id) do
    %{participants: participants, pairs: pairs} = data
    participant = Map.get(participants, id)
    if not is_nil(participant.pair) do
      format_participant(participant)
      |> Map.merge(format_pair(Map.get(pairs, participant.pair)))
      |> Map.merge(format_data(data))
    else
      format_participant(participant)
      |> Map.merge(format_data(data))
    end
  end
end
