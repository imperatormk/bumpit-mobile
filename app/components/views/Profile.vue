<template>
  <ViewContainer>
    <ScrollView orientation="vertical">
      <FlexboxLayout flexDirection="column" padding="20">
        <Label text="@usernamehere" textAlignment="center"/>
        <StackLayout height="10"/>

        <FlexboxLayout justifyContent="center" alignItems="center" width="100%">
          <FlexboxLayout width="100" height="100" backgroundColor="#eaeef0" borderRadius="50%" alignItems="center" justifyContent="center">
            <Label fontSize="24" class="fas" color="#a1a1a2" :text="'\uf030'"/>
          </FlexboxLayout>
        </FlexboxLayout>
        <StackLayout height="20"/>

        <FlexboxLayout flexDirection="column">
          <Label class="category" text="Profile"/>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Username"/>
            <Label text="@usernamehere"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="First name"/>
            <Label text="Darko"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Last name"/>
            <Label text="Simonovski"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Location"/>
            <Label text="Bitola"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Shipping address"/>
            <Label text="Apostol Zdravevski 34 7000"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Bio"/>
            <Label text="War"/>
          </FlexboxLayout>
        </FlexboxLayout>
        <StackLayout height="30"/>

        <FlexboxLayout flexDirection="column">
          <Label class="category" text="Account"/>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Contact email"/>
            <Label text="darko.simonovski@hotmail.com"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Payout settings"/>
            <Label text="arrowhere"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Disable trades"/>
            <Switch/>
          </FlexboxLayout>
        </FlexboxLayout>
        <StackLayout height="30"/>

        <FlexboxLayout flexDirection="column">
          <Label class="category" text="Localization"/>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Language"/>
            <Label text="English"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout flexDirection="column">
            <Label class="label" text="Currency"/>
            <StackLayout height="10"/>
            <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
              <FlexboxLayout>
                <StackLayout v-for="(currency, idx) in currencies" :key="idx" @tap="selectCurrency(idx)" :backgroundColor="profile.selectedCurrency === idx ? 'black' : 'white'" padding="5 10">
                  <Label :text="currency" :color="profile.selectedCurrency === idx ? 'white' : 'black'"/>
                </StackLayout>
              </FlexboxLayout>
            </ScrollView>
          </FlexboxLayout>
        </FlexboxLayout>
        <StackLayout height="30"/>

        <FlexboxLayout flexDirection="column">
          <Label class="category" text="Notifications"/>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Someone like your listing"/>
            <Switch/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Someone followed you"/>
            <Switch/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Facebook friend listed an item"/>
            <Switch/>
          </FlexboxLayout>
        </FlexboxLayout>
        <StackLayout height="30"/>

        <StateButton text="Save changes"/>
      </FlexboxLayout>
    </ScrollView>
  </ViewContainer>
</template>

<script>
export default {
  data: () => ({
    currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    profile: {
      selectedCurrency: 0
    }
  }),
  methods: {
    selectCurrency(idx) {
      this.profile.selectedCurrency = idx
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  font-variant: small-caps;
  text-transform: uppercase;
  font-weight: bold;
}
.label {
  color: black;
}
</style>
