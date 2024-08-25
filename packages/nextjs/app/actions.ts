'use server'

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import {authOptions} from '~~/lib/authOptions'

export const verifyProof = async (proof: any) => {
  console.log('proof', proof);
  const response = await fetch(
    'https://developer.worldcoin.org/api/v1/verify/app_f17ed6966bd816b97281c3908db2bee7',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...proof, action: "verify-test"}),
    }
  );
  if (response.ok) {
    const { verified } = await response.json();
    return verified;
  } else {
    const { code, detail } = await response.json();
    throw new Error(`Error Code ${code}: ${detail}`);
  }
};

export const getWLDSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
}