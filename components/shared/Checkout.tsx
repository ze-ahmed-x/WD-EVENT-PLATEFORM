import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import { Button } from '../ui/button';

import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.actions';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Checkout = ({event, userId} : {event: IEvent, userId: string}) => {
    const onCheckout = async () => {
        const order = {
          eventTitle: event.title,
          eventId: event.id,
          price: (event.price === undefined ? '0' : event.price),
          isFree: event.isFree,
          buyerId: userId
        }
    await checkoutOrder(order);
    }
    React.useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
      if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.');
      }
  
      if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
      }
    }, []);




  return (
    <form action= {onCheckout} method='POST'>
        <Button type='submit' role='link' size= 'lg' className='button sm:w-fit'>
            {event.isFree? 'Get Tickets' : 'Buy Tickets'}
        </Button>
    </form>
  )
}

export default Checkout