import DatabaseVoteItem from '../types/database/DatabaseVoteItem';

export default function toClientVoteItem(voteItem: DatabaseVoteItem) {
  const { name, id } = voteItem;
  return { name, id };
}
