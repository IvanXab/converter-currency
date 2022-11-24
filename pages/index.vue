<script>
import { getConvertedCurrency, getCurrencyCode, getCurrencyLatest } from '@/utils/fetchCurrency';

export default {
  name: 'IndexPage',

  data: () => ({
    optionsCode: [],
    rates: [],
    amount: '',
    from: 'USD',
    to: 'RUB',
    currentDate: '',
    convertedCurrency: '',
  }),

  methods: {
    async fetchCurrencyLatest() {
      const { currentDate, rates } = await getCurrencyLatest();

      this.currentDate = currentDate;
      this.rates = rates;
    },
    async fetchCurrencyCode() {
      const currencyCode = await getCurrencyCode();

      this.optionsCode = currencyCode;
    },
    async handleConvertedCurrency() {
      if (this.amount) {
        const convertedCurrency = await getConvertedCurrency(this.from, this.to, this.amount);

        this.convertedCurrency = `${ this.amount } ${ this.from } = ${ convertedCurrency } ${ this.to }`;
      }
    },
    handleSwapCurrency() {
      const temp = this.to;

      this.to = this.from;
      this.from = temp;

      this.handleConvertedCurrency();
    }
  },

  mounted() {
    this.fetchCurrencyCode();
    this.fetchCurrencyLatest();
  }
}
</script>

<template>
  <v-app>
    <div class="converter">
      <h1 class="converter__header">Converter Currency</h1>

      <div class="converter__form">
        <v-text-field label="Amount" v-model="amount" />
        <v-select
          :items="optionsCode"
          label="From"
          v-model="from"
        />
        <v-btn icon @click="handleSwapCurrency">
          <v-icon x-large>
            mdi-swap-horizontal
          </v-icon>
        </v-btn>
        <v-select
          :items="optionsCode"
          label="To"
          v-model="to"
        />
      </div>

      <div class="converter__worker">
        <p class="converter__result">{{ convertedCurrency }}</p>
        <v-btn color="primary" @click="handleConvertedCurrency">Convert</v-btn>
      </div>

      <p class="converter__info">Exchange rate (1 USD) on {{ currentDate }}:</p>
      <div class="converter__currencies">
        <div class="converter__currency" v-for="rate in rates">
          <p>{{ rate[0] }} - {{ rate[1] }}</p>
          <hr class="converter__divider" />
        </div>
      </div>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
.converter {
  max-width: 800px;
  max-height: 570px;
  min-height: 200px;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 20px;
  background: #000;

  &__form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media screen and (max-width: 420px) {
      flex-direction: column;
    }
  }

  &__header {
    margin-bottom: 20px;
    font-size: 24px;
  }

  &__worker {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    @media screen and (max-width: 520px) {
      flex-direction: column;
    }
  }

  &__result {
    margin: 10px 0;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;

    @media screen and (max-width: 520px) {
      margin: 5px 0;
      font-size: 15px;
    }
  }

  &__info {
    margin-top: 5px;
    font-weight: 700;
    color: #fff;
  }

  &__currencies {
    max-height: 280px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    @media screen and (max-width: 420px) {
      max-height: 110px;
    }

    @media screen and (max-width: 370px) {
      max-height: 80px;
    }
  }

  &__currency {
    margin: 10px 0;
    font-size: 20px;
  }

  &__divider {
    border: 1px solid #90EE90FF;
  }

  @media screen and (max-width: 320px) {
    max-width: 270px;
  }
}
</style>

