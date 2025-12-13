<template>
    <div v-if="show" class="modal-backdrop">
        <div class="modal-card">
            <h4>Checkout</h4>

            <form @submit.prevent="submitPayment">
                <div class="mb-2">
                    <label class="form-label">Card Number</label>
                    <input v-model="cardNumber" class="form-control" placeholder="1234 5678 9012 3456" />
                </div>

                <div class="mb-2">
                    <label class="form-label">Name on Card</label>
                    <input v-model="cardName" class="form-control" />
                </div>

                <div class="row">
                    <div class="col">
                        <label class="form-label">Expiry</label>
                        <input v-model="expiry" class="form-control" placeholder="MM/YY" />
                    </div>
                    <div class="col">
                        <label class="form-label">CVV</label>
                        <input v-model="cvv" class="form-control" placeholder="123" />
                    </div>
                </div>

                <p v-if="error" class="text-danger mt-2">{{ error }}</p>
                <p v-if="success" class="text-success mt-2">
                    Payment accepted ✅
                </p>

                <div class="d-flex justify-content-end gap-2 mt-3">
                    <button type="button" class="btn btn-secondary" @click="close">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                        Pay
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    show: Boolean
})

const emit = defineEmits(['close'])

const cardNumber = ref('')
const cardName = ref('')
const expiry = ref('')
const cvv = ref('')
const error = ref('')
const success = ref(false)

function isValidCard(cardNumber) {
    const clean = cardNumber.replace(/\D/g, '')

    if (clean.length < 13 || clean.length > 19) return false

    let sum = 0
    let shouldDouble = false

    for (let i = clean.length - 1; i >= 0; i--) {
        let digit = parseInt(clean[i], 10)

        if (shouldDouble) {
            digit *= 2
            if (digit > 9) digit -= 9
        }

        sum += digit
        shouldDouble = !shouldDouble
    }

    return sum % 10 === 0
}

function submitPayment() {
    error.value = ''
    success.value = false

    if (!isValidCard(cardNumber.value)) {
        error.value = 'Invalid card number'
        return
    }

    if (!cardName.value.trim()) {
        error.value = 'Card holder name required'
        return
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry.value)) {
        error.value = 'Expiry must be MM/YY'
        return
    }

    if (!/^\d{3,4}$/.test(cvv.value)) {
        error.value = 'Invalid CVV'
        return
    }

    success.value = true

    setTimeout(() => {
        close()
    }, 1500)
}

function close() {
    cardNumber.value = ''
    cardName.value = ''
    expiry.value = ''
    cvv.value = ''
    error.value = ''
    success.value = false
    emit('close')
}
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
}
</style>
