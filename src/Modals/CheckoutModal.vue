<template>
    <div v-if="show" class="modal-backdrop ">
        <div class="modal-card bg-white p-8 rounded-lg">
            <h4 class="text-5xl text-center">Checkout</h4>

            <form @submit.prevent="submitPayment" class="flex flex-col gap-4">
                <label class="form-label flex flex-col gap-2">Name on Card
                    <input v-model="cardName"
                        class="form-control border border-gray-300 rounded-lg focus:outline-none p-2" minlength="3" />
                </label>
                <label class="form-label flex flex-col gap-2 ">Card Number
                    <input v-model="cardNumber"
                        class="form-control border border-gray-300 rounded-lg focus:outline-none p-2"
                        placeholder="1234 5678 9012 3456" maxlength="16" />
                </label>
                <div class="flex gap-2">

                    <label class="form-label w-full flex flex-col gap-2">Expiry
                        <input v-model="expiry"
                            class="form-control border border-gray-300 rounded-lg focus:outline-none p-2"
                            placeholder="MM/YY" maxlength="5" />
                    </label>

                    <label class="form-label w-full flex flex-col gap-2">CVV
                        <input v-model="cvv"
                            class="form-control border border-gray-300 rounded-lg focus:outline-none p-2"
                            placeholder="123" maxlength="3" />
                    </label>
                </div>

                <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
                <p v-if="notification" class="text-green-500 mt-2">
                    {{ notification }}
                </p>

                <div class="flex justify-end gap-4">
                    <button type="button"
                        class="bg-red-500 text-white border border-red-500 rounded-lg hover:bg-white hover:text-red-500 px-4 py-2"
                        @click="close">
                        Cancel
                    </button>
                    <button type="submit"
                        class="bg-green-500 text-white border border-green-500 rounded-lg hover:bg-white hover:text-green-500 px-4 py-2">
                        Confirm Payment
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { clearCart } from '@/services/cart.js'

defineProps({
    show: Boolean
})

const emit = defineEmits(['close', 'cart-cleared'])

const cardNumber = ref('')
const cardName = ref('')
const expiry = ref('')
const cvv = ref('')
const error = ref('')
const notification = ref('')

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
    notification.value = ''

    if (!isValidCard(cardNumber.value)) {
        error.value = '*Invalid card number'
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

    // Payment valid, clear cart
    clearCart()
    emit('cart-cleared')
    notification.value = 'Payment successful! 🎉 Your cart has been cleared.'
    window.location.reload()

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
    notification.value = ''
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
</style>
