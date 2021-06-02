import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import { IAccount } from './interfaces/IAccount'
import AccountRow from './components/AccountRow'

import { isRunning } from './utils/isRunning'
import { openSteam, closeSteam } from './utils/steam'
import useStorageState from './hooks/useStorageState'

function AppContainer(): JSX.Element {
  const [attemptsToClose, setAttemptsToClose] = useState<number>(0)
  const [accountList, setAccountList] = useStorageState<IAccount[]>('account_list', [])

  function onPressOpenSteam(account?: IAccount) {
    if (!account) return
    isRunning('Steam.exe', (isOpened) => {
      if (isOpened) {
        if (attemptsToClose > 10) {
          setAttemptsToClose(0)
          // Error Closing Steam
          return
        }
        setAttemptsToClose(prev => prev + 1)
        closeSteam()
        setTimeout(() => {
          onPressOpenSteam(account)
        }, 500)
      } else {
        setAttemptsToClose(0)
        openSteam({
          login: account.account,
          password: account.password,
        })
      }
    })
  }

  function onSubmitAccount(newAccount: IAccount) {
    const targetAccountIndex = accountList.findIndex(account => account.uuid === newAccount.uuid)
    if (targetAccountIndex >= 0) {
      const tempList = [...accountList]
      tempList.splice(targetAccountIndex, 1, newAccount)
      setAccountList(tempList)
    } else {
      setAccountList([...accountList, newAccount])
    }
  }

  function onPressDeleteItem(accountToDelete?: IAccount) {
    if (!accountToDelete) return
    const targetAccountIndex = accountList.findIndex(account => account.uuid === accountToDelete.uuid)
    if (targetAccountIndex >= 0) {
      const tempList = [...accountList]
      tempList.splice(targetAccountIndex, 1)
      setAccountList(tempList)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={accountList}
        style={styles.listContainer}
        ListHeaderComponent={(
          <AccountRow item={{} as IAccount} addAccount={onSubmitAccount} />
        )}
        keyExtractor={item => item.account}
        renderItem={({ item }) => (
          <AccountRow
            item={item}
            onPressDelete={onPressDeleteItem}
            editAccount={onSubmitAccount}
            onPressPlay={onPressOpenSteam}
          />
        )}
      />
    </View>
  )
}

export default AppContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
})
