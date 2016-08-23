defmodule Ultimatum.Participant do
  alias Ultimatum.Actions

  # Actions
  def fetch_contents(data, id) do
    Actions.update_participant_contents(data, id)
  end

  def change_allo_temp(data, id, allo_temp) do
    pair_id = get_in(data, [:participants, id, :pair_id])
    "allocating" = get_in(data, [:pairs, pair_id, :state])
    Actions.change_allo_temp(data, id, allo_temp)
  end

  def finish_allocating(data, id, allo_temp) do
    Actions.finish_allocating(data, id, allo_temp)
  end

  def response_ok(data, id, allo_temp) do
    Actions.response_ok(data, id, allo_temp)
  end

  def response_ng(data, id) do
    Actions.response_ng(data, id)
  end

  def format_participant(participant), do: participant

  def format_data(data) do
    %{
      page: data.page,
      game_mode: data.game_mode,
      game_round: data.game_round,
      game_progress: data.game_progress,
    }
  end

  def format_pair(pair) do
    %{
      members: pair.members,
      now_round: pair.now_round,
      allo_temp: pair.allo_temp,
      state: pair.state,
    }
  end

  def format_contents(data, id) do
    %{participants: participants} = data
    participant = Map.get(participants, id)
    pair_id = get_in(data, [:participants, id, :pair_id])
    unless is_nil(pair_id) do
      pair = get_in(data, [:pairs, pair_id])
      format_participant(participant)
      |> Map.merge(format_data(data))
      |> Map.merge(format_pair(pair))
    else
      format_participant(participant)
      |> Map.merge(format_data(data))
    end
  end
end
