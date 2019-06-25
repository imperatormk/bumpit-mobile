<template>
  <ViewContainer :loading="!loaded">
    <FlexCol slot="scrollable">
      <FlexRow justifyContent="center" alignItems="center" width="100%">
        <Avatar :avatar="user.avatar" shouldSelect/>
      </FlexRow>
      <Split big/>

      <FlexCol>
        <Label class="category" text="Profile"/>
        <Split big/>

        <StackLayout>
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Username"/>
            <Label :text="'@' + user.username"/>
          </FlexRow>
        </StackLayout>
        <Split big/>

        <StackLayout @tap="editField('name')">
          <FlexRow justifyContent="space-between">
            <Label class="label" text="First name"/>
            <Label :text="user.name"/>
          </FlexRow>
        </StackLayout>
        <Split big/>

        <StackLayout @tap="editField('surname')">
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Last name"/>
            <Label :text="user.surname"/>
          </FlexRow>
        </StackLayout>
        <Split big/>

        <StackLayout @tap="editField('location')">
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Location"/>
            <Label :text="user.location"/>
          </FlexRow>
        </StackLayout>
        <Split big/>

        <StackLayout @tap="editField('phone')">
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Phone"/>
            <Label :text="user.phone"/>
          </FlexRow>
        </StackLayout>
        <Split big/>

        <StackLayout @tap="editField('bio')">
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Bio"/>
            <Label :text="user.bio"/>
          </FlexRow>
        </StackLayout>
      </FlexCol>
      <Split size="30"/>

      <FlexCol>
        <Label class="category" text="Account"/>
        <Split big/>

        <StackLayout @tap="editField('email')">
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Contact email"/>
            <Label :text="user.email"/>
          </FlexRow>
        </StackLayout>
        <Split big/>

        <StackLayout>
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Payout settings"/>
            <Label text="arrow_here"/>
          </FlexRow>
        </StackLayout>
        <Split big/>

        <StackLayout @tap="gotoShippingDetails">
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Shipping info"/>
            <Label text="arrow_here"/>
          </FlexRow>
        </StackLayout>
        <Split big/>

        <StackLayout>
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Disable trades"/>
            <Switch v-model="user.settings.disableTrades"/>
          </FlexRow>
        </StackLayout>
      </FlexCol>
      <Split size="30"/>

      <FlexCol>
        <Label class="category" text="Localization"/>
        <Split big/>

        <StackLayout @tap="editField('language', true)">
          <FlexRow justifyContent="space-between">
            <Label class="label" text="Language"/>
            <Label :text="user.settings.language"/>
          </FlexRow>
        </StackLayout>
        <Split big/>

        <FlexCol>
          <Label class="label" text="Currency"/>
          <Split/>
          <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
            <FlexRow>
              <StackLayout v-for="(currency, idx) in currencies" :key="idx" @tap="selectCurrency(idx)" :backgroundColor="selectedCurrency === idx ? 'black' : 'white'" padding="5 10">
                <Label :text="currency" :color="selectedCurrency === idx ? 'white' : 'black'"/>
              </StackLayout>
            </FlexRow>
          </ScrollView>
        </FlexCol>
      </FlexCol>
      <Split size="30"/>

      <FlexCol>
        <Label class="category" text="Notifications"/>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Someone like your listing"/>
          <Switch v-model="user.settings.notifOnLike"/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Someone followed you"/>
          <Switch v-model="user.settings.notifOnFollow"/>
        </FlexRow>
        <Split big/>

        <FlexRow justifyContent="space-between">
          <Label class="label" text="Facebook friend listed an item"/>
          <Switch v-model="user.settings.notifOnFriendPost"/>
        </FlexRow>
      </FlexCol>
      <Split size="30"/>

      <StateButton @onTap="saveChanges" text="Save changes"/>
      <Split/>
      <StateButton @onTap="logout" v-if="user" text="Logout"/>
    </FlexCol>
  </ViewContainer>
</template>

<script>
import Avatar from '@/components/blocks/user/Avatar'
import Auth from '@/services/auth'
import EventBus from '@/services/event-bus'

const dialogs = require('tns-core-modules/ui/dialogs')

export default {
  mounted() {
    this.getAuthUser()
  },
  data: () => ({
    currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
    selectedCurrency: 0,
    user: { avatar: '', settings: {} },
    loaded: false
  }),
  methods: {
    selectCurrency(idx) {
      this.selectedCurrency = idx
      this.user.settings.currency = this.currencies[idx]
    },
    getAuthUser() {
      this.loaded = false
      return Auth.getAuthUser(true)
        .then((user) => {
          this.user = user
          this.loaded = true
        })
    },
    editField(field, isUserSettings) {
      const initialVal = !isUserSettings ? this.user[field] : this.user.settings[field]

      let type = dialogs.inputType.text
      if (field === 'email') type = dialogs.inputType.email

      dialogs.prompt({
        title: `Edit ${field}`,
        okButtonText: 'OK',
        defaultText: initialVal || '',
        inputType: type
      }).then((resp) => {
        const result = resp.result
        const val = resp.text.trim()

        if (result && val) {
          if (!isUserSettings) {
            this.user[field] = val
          } else {
            this.user.settings[field] = val
          }
        }
      })
    },
    gotoShippingDetails() {
      EventBus.$emit('navigateTo', 'ShippingDetails')
    },
    saveChanges() {
      const userObj = JSON.parse(JSON.stringify(this.user))
      console.log(userObj)
    },
    logout() {
      Auth.logout()
        .then(() => this.getAuthUser())
    }
  },
  components: {
    Avatar
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
