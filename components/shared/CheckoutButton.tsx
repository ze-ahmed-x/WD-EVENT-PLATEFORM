'use client'
import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import Checkout from './Checkout';

const CheckoutButton = ({event} : {event: IEvent}) => {
    const hasEventFinished = new Date(event.endDateTime) < new Date();
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string; // yes we could have done it using auth() as well but its a client component so we could go this way as well
  return (
    <div className='flex items-center gap-3'>
        {/* Disable buying past events */}
        { hasEventFinished ? (
            <p className='p-2 text-red-400'
            >Sorry, tickets are no longer available.</p>
        ):(
        <>
        <SignedOut>
            <Button asChild className='button rounded-full' size='lg'>
                <Link href= '/sign-in'
                className=''
                >
                    Get Tickets
                </Link>
            </Button>
        </SignedOut>
        <SignedIn>
            <Checkout event={event} userId = {userId} />
        </SignedIn>
        </>)}
    </div>
  )
}

export default CheckoutButton