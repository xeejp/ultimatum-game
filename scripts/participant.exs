defmodule Ultimatum.Participant do
  alias Ultimatum.Actions
  require Logger

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
    pair_id = get_in(data, [:participants, id, :pair_id])
    put_in(data, [:pairs, pair_id, :state], "judging")
    |> Actions.finish_allocating(id, allo_temp)
  end

  def response_ok(data, id, result) do
    value = get_in(result, ["value"])
    change_count = get_in(result, ["change_count"])
    pair_id = get_in(data, [:participants, id, :pair_id])
    now_round = get_in(data, [:pairs, pair_id, :now_round])
    game_round = get_in(data, [:game_round])
    game_mode = get_in(data, [:game_mode])
    results = case game_mode do
      "ultimatum" -> :ultimatum_results
      "dictator" -> :dictator_results
    end
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
    id_role = get_in(data, [:participants, id, :role])
    target_id_role = get_in(data, [:participants, target_id, :role])
    id_point = get_in(data, [:participants, id, :point])
    target_id_point = get_in(data, [:participants, target_id, :point])
    put_in(data, [:participants, id, :role],
     case id_role == "responder" do
       true -> case game_mode == "ultimatum" do
         true -> "proposer"
         false -> "dictator"
       end
       false -> "responder"
     end
    )
    |> put_in([:participants, target_id, :role],
     case target_id_role == "responder" do
       true -> case game_mode == "ultimatum" do
         true -> "proposer"
         false -> "dictator"
       end
       false -> "responder"
     end
    )
    |> put_in([:participants, target_id, :role],
     case target_id_role == "responder" do
       true -> case game_mode == "ultimatum" do
         true -> "proposer"
         false -> "dictator"
       end
       false -> "responder"
     end
    )
    |> put_in([:participants, id, :point],
      case id_role == "responder" do
         true -> id_point + (1000 - value)
         false -> id_point + value
      end
    )
    |> put_in([:participants, target_id, :point],
      case target_id_role == "responder" do
         true -> target_id_point + (1000 - value)
         false -> target_id_point + value
      end
    )
    |> put_in([:pairs, pair_id, :state],
     case now_round < game_round do
       true -> "allocating"
       false -> "finished"
     end
    )
    |> put_in([:pairs, pair_id, :now_round],
    case now_round < game_round do
      true -> now_round + 1
      false -> now_round
    end
    )
    |> put_in([results], %{
      Integer.to_string(now_round) => %{
        pair_id => %{
         value: value,
         change_count: change_count,
         accept: true
        }
      }
    })
    |> Actions.response_ok(id, result)
  end

  def response_ng(data, id, result) do
    value = get_in(result, ["value"])
    change_count = get_in(result, ["change_count"])
    pair_id = get_in(data, [:participants, id, :pair_id])
    now_round = get_in(data, [:pairs, pair_id, :now_round])
    game_round = get_in(data, [:game_round])
    game_mode = get_in(data, [:game_mode])
    results = case game_mode do
      "ultimatum" -> :ultimatum_results
      "dictator" -> :dictator_results
    end
    members = get_in(data, [:pairs, pair_id, :members])
    target_id = case members do
      [^id, target_id] -> target_id
      [target_id, ^id] -> target_id
    end
    id_role = get_in(data, [:participants, id, :role])
    target_id_role = get_in(data, [:participants, target_id, :role])
    id_point = get_in(data, [:participants, id, :point])
    target_id_point = get_in(data, [:participants, target_id, :point])
    put_in(data, [:participants, id, :role],
     case id_role == "responder" do
       true -> case game_mode == "ultimatum" do
         true -> "proposer"
         false -> "dictator"
       end
       false -> "responder"
     end
    )
    |> put_in([:participants, target_id, :role],
     case target_id_role == "responder" do
       true -> case game_mode == "ultimatum" do
         true -> "proposer"
         false -> "dictator"
       end
       false -> "responder"
     end
    )
    |> put_in([:participants, target_id, :role],
     case target_id_role == "responder" do
       true -> case game_mode == "ultimatum" do
         true -> "proposer"
         false -> "dictator"
       end
       false -> "responder"
     end
    )
    |> put_in([:participants, id, :point],
      case id_role == "responder" do
         true -> id_point + (1000 - value)
         false -> id_point + value
      end
    )
    |> put_in([:participants, target_id, :point],
      case target_id_role == "responder" do
         true -> target_id_point + (1000 - value)
         false -> target_id_point + value
      end
    )
    |> put_in([:pairs, pair_id, :state],
     case now_round < game_round do
       true -> "allocating"
       false -> "finished"
     end
    )
    |> put_in([:pairs, pair_id, :now_round],
      case now_round < game_round do
        true -> now_round + 1
        false -> now_round
      end
    )
    |> put_in([results], %{
      Integer.to_string(now_round) => %{
        pair_id => %{
         value: value,
         change_count: change_count,
         accept: false
        }
      }
    })
    |> Actions.response_ng(id, result)
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
