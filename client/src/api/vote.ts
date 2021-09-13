import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import VoteItemPair from '../types/vote/VoteItemPair';
import VotePairResult from '../types/vote/VotePairResult';

export async function getPair(token: string) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/vote/',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<VoteItemPair>;
}
export async function sendVotePairResult(
  token: string,
  votePairResult: VotePairResult,
) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/vote/',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    data: votePairResult,
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<VoteItemPair>;
}
