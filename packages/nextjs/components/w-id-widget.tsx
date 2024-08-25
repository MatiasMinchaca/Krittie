'use client';

import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import {verifyProof} from '~~/app/actions';
import {Button} from '~~/components/ui/button';
import {useRouter} from 'next/navigation';

interface WidgetProps {
  open: () => void;
}

export default function WIDWidget() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSuccess = async (result: ISuccessResult) => {
    setLoading(true);

    try {
      const signInResult = await signIn('worldcoin', {
        redirect: false,
        id: result.proof,
      });

      if (signInResult?.ok) {
        router.push('/krittiers')
      }
    } catch (error) {
      console.error('Error en la autenticación con World ID:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
      <IDKitWidget
        action="verify-test"
        // signal="user_action"
        onSuccess={handleSuccess}
        handleVerify={verifyProof}
        verification_level={VerificationLevel.Device}
        app_id={'app_f17ed6966bd816b97281c3908db2bee7' || process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID as string}
      >
        {({ open }: WidgetProps) => <Button onClick={open} disabled={loading}>Sign In with World ID</Button>}
      </IDKitWidget>
  );
}
