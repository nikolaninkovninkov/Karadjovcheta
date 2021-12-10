import React, { useCallback, useEffect, useState } from 'react';
import { getPair, sendVotePairResult } from '../../api/vote';
import useAuth from '../../hooks/useAuth';
import VoteItemPair from '../../types/vote/VoteItemPair';
import VoteOutcome from '../../types/vote/VoteOutcome';

export default function Vote() {
  const { token } = useAuth();
  const [pair, setPair] = useState<VoteItemPair>();
  const [votesLeft, setVotesLeft] = useState<number>();
  const getVoteItemPair = useCallback(() => {
    getPair(token).then((response) => {
      setPair(response.data.pair);
      setVotesLeft(response.data.votesLeft);
    });
  }, [token]);
  const sendVoteResult = async (outcome: VoteOutcome) => {
    if (!pair) return;
    const response = await sendVotePairResult(token, {
      first: pair.first.id,
      second: pair.second.id,
      result: outcome,
    });
    setPair(response.data.pair);
    setVotesLeft(response.data.votesLeft);
  };
  useEffect(() => {
    getVoteItemPair();
  }, [getVoteItemPair]);
  if (votesLeft === 0)
    return (
      <div className='vote'>
        <h1>No votes left</h1>
      </div>
    );
  return pair && Object.keys(pair).length ? (
    <div className='vote'>
      <h1>Vote for one</h1>
      <h2>Votes left: {votesLeft}</h2>
      <button
        onClick={() => {
          sendVoteResult(1);
        }}
        className='vote-btn'>
        {pair.first.name}
      </button>
      <button
        onClick={() => {
          sendVoteResult(0);
        }}
        className='vote-btn'>
        {pair.second.name}
      </button>
    </div>
  ) : (
    <>No items to vote for</>
  );
}
