import BaseERC20GuildContract from 'contracts/BaseERC20Guild.json';
import { useContractEvent, useContractRead } from 'wagmi';

const useProposalVotes = (guildId: string, proposalId: string) => {
  const { data, refetch, ...rest } = useContractRead({
    addressOrName: guildId,
    contractInterface: BaseERC20GuildContract.abi,
    functionName: 'proposalVotes',
    args: [proposalId],
  });

  useContractEvent({
    addressOrName: guildId,
    contractInterface: BaseERC20GuildContract.abi,
    eventName: 'VoteAdded',
    listener() {
      refetch();
    },
  });

  return { data, refetch, ...rest };
};

export default useProposalVotes;
