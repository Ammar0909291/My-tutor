const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID || ''
const YOOKASSA_SECRET_KEY = process.env.YOOKASSA_SECRET_KEY || ''

function authHeader() {
  return 'Basic ' + Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_SECRET_KEY}`).toString('base64')
}

export async function createPayment(
  amount: number,
  currency: string = 'RUB',
  description: string,
  returnUrl: string,
  metadata: Record<string, string> = {},
): Promise<{ id: string; confirmationUrl: string }> {
  const res = await fetch('https://api.yookassa.ru/v3/payments', {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
      'Idempotence-Key': crypto.randomUUID(),
    },
    body: JSON.stringify({
      amount: { value: amount.toFixed(2), currency },
      confirmation: { type: 'redirect', return_url: returnUrl },
      description,
      metadata,
      capture: true,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.description || 'YooKassa error')
  return { id: data.id, confirmationUrl: data.confirmation.confirmation_url }
}

export async function getPaymentStatus(paymentId: string): Promise<string> {
  const res = await fetch(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
    headers: { Authorization: authHeader() },
  })
  const data = await res.json()
  return data.status
}
