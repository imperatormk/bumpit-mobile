<template>
  <ViewContainer :loading="!loaded">
    <ScrollView orientation="vertical">
      <FlexCol padding="20">
        <Label :text="'@' + user.username" textAlignment="center"/>
        <StackLayout height="10"/>

        <FlexboxLayout justifyContent="center" alignItems="center" width="100%">
          <FlexboxLayout width="100" height="100" backgroundColor="#eaeef0" borderRadius="50%" alignItems="center" justifyContent="center">
            <Label fontSize="24" class="fas" color="#a1a1a2" :text="'\uf030'"/>
          </FlexboxLayout>
        </FlexboxLayout>
        <StackLayout height="20"/>

        <FlexCol>
          <Label class="category" text="Profile"/>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Username"/>
            <Label :text="'@' + user.username"/>
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
            <Label :text="user.location"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Shipping address"/>
            <Label text="Apostol Zdravevski 34 7000"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Bio"/>
            <Label :text="user.bio"/>
          </FlexboxLayout>
        </FlexCol>
        <StackLayout height="30"/>

        <FlexCol>
          <Label class="category" text="Account"/>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Contact email"/>
            <Label :text="user.email"/>
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
        </FlexCol>
        <StackLayout height="30"/>

        <FlexCol>
          <Label class="category" text="Localization"/>
          <StackLayout height="20"/>

          <FlexboxLayout justifyContent="space-between">
            <Label class="label" text="Language"/>
            <Label text="English"/>
          </FlexboxLayout>
          <StackLayout height="20"/>

          <FlexCol>
            <Label class="label" text="Currency"/>
            <StackLayout height="10"/>
            <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
              <FlexboxLayout>
                <StackLayout v-for="(currency, idx) in currencies" :key="idx" @tap="selectCurrency(idx)" :backgroundColor="profile.selectedCurrency === idx ? 'black' : 'white'" padding="5 10">
                  <Label :text="currency" :color="profile.selectedCurrency === idx ? 'white' : 'black'"/>
                </StackLayout>
              </FlexboxLayout>
            </ScrollView>
          </FlexCol>
        </FlexCol>
        <StackLayout height="30"/>

        <FlexCol>
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
        </FlexCol>
        <StackLayout height="30"/>

        <StateButton text="Save changes"/>
        <StackLayout height="10"/>
        <StateButton @onTap="logoutTest" v-if="user" text="Logout"/>
      </FlexCol>
    </ScrollView>
  </ViewContainer>
</template>

<script>
import Auth from '@/services/auth'
import EventBus from '@/services/event-bus'

export default {
  mounted() {
    this.getAuthUser()
  },
  data: () => ({
    currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    profile: {
      selectedCurrency: 0
    },
    user: {},
    loaded: false
  }),
  methods: {
    selectCurrency(idx) {
      this.profile.selectedCurrency = idx
    },
    getAuthUser() {
      this.loaded = false
      return Auth.getAuthUser()
        .then((user) => {
          this.user = user
          this.loaded = true
        })
    },
    logoutTest() {
      Auth.logout()
        .then((resp) => {
          this.getAuthUser()
        })
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
