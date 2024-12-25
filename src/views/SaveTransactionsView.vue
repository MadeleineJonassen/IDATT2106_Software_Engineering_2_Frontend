<script setup lang="ts">
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Input from '@/components/ui/input/Input.vue';
import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/ui/PageWrapper.vue';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ref } from 'vue';
import { BankAccountControllerService, type TransactionDto } from '@/lib/api'
import { useBankAccounts } from '@/lib/composables/bankAccounts'
import { useChallengeCategories } from '@/lib/composables/challengeCategory'

const { data: bankAccounts } = useBankAccounts();
const { data: categories } = useChallengeCategories();

const sum = ref<number | undefined>(undefined);
const description = ref<string | undefined>(undefined);
const bankAccountEntityId = ref<number | undefined>(undefined);
const categoryEntityId = ref<number | undefined>(undefined);
const dateToday = new Date().toISOString();

function createTransactionDto(): TransactionDto {
  return {
    date: dateToday,
    sum: sum.value,
    description: description.value,
    bankAccountEntityId: bankAccountEntityId.value,
    categoryEntityId: categoryEntityId.value
  };
}

const handleSubmit = async () => {
  const newTransaction = createTransactionDto();
  const accountId = newTransaction.bankAccountEntityId;
  if (typeof accountId === 'number') {
    try {
      await BankAccountControllerService.addTransactionToAccount(accountId, newTransaction);
      console.log('Transaction successful');
    } catch (e) {
      console.error('Error submitting transaction:', e);
    }
  } else {
    console.error('Invalid account ID');
  }
}

</script>


<template>
  <PageWrapper>
    <Card class="h-fit">
      <form @submit.prevent="handleSubmit">
        <CardContent>
          <div class="flex gap-2.5 flex-col">
            <FormField name="newTransaction">
              <FormItem>
                <FormLabel>Sum - Hvor mye skal overføres/trekkes</FormLabel>
                <br />
                <FormLabel>Positive tall legges til konto, negative trekkes</FormLabel>
                <FormControl>
                  <Input class="rounded-none" v-model.number="sum" />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Bankkonto - Hvilken konto skal brukes</FormLabel>
                <br />
                <FormControl>
                  <select class="rounded-none" v-model.number="bankAccountEntityId">
                    <option disabled value="">Please select one</option>
                    <option v-for="account in bankAccounts" :key="account.id" :value="account.id">
                      {{ account.name }}
                    </option>
                  </select>
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Beskrivelse - Hva slags transaksjon</FormLabel>
                <FormControl>
                  <Input class="rounded-none" v-model="description" />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Kategori - Hva slags transaksjonskategori er det</FormLabel>
                <br />
                <FormControl>
                  <select class="rounded-none" v-model.number="categoryEntityId">
                    <option disabled value="">Please select one</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" class="w-full gap-1">
            Send inn transaksjon
          </Button>
        </CardFooter>
      </form>
    </Card>
  </PageWrapper>
</template>


