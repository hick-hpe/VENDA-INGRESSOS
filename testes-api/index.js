import { MercadoPagoConfig, Payment } from 'mercadopago';
import 'dotenv/config';

const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN,
    options: {
        timeout: 5000,
        idempotencyKey: 'abc' // é para tentar novamente as solicitações sem executar acidentalmente a mesma operação duas vezes
    }
});

const payment = new Payment(client);

const body = {
    transaction_amount: 27.53,
    description: 'Criação de um link',
    payment_method_id: 'pix',
    payer: {
        email: process.env.EMAIL
    },
};

payment.create({ body })
    .then(response => {
        const LINK_PAGAMENTO = response.point_of_interaction.transaction_data.ticket_url;
        console.log("Link de pagamento:", LINK_PAGAMENTO);
    })
    .catch(error => {
        console.error("Erro ao criar pagamento:", error);
    });
