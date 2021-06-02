import React, { useState } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { TextInput, Surface, IconButton } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'

import { IAccount } from '../interfaces/IAccount'

interface IAccountRowProps {
  item?: IAccount
  disabled?: boolean
  addAccount?(newAccount: IAccount): void
  editAccount?(editAccount: IAccount): void
  onPressDelete?(deleteAccount?: IAccount): void
  onPressPlay?(playAccount?: IAccount): void
}

function AccountRow({
  item,
  disabled = false,
  addAccount,
  editAccount,
  onPressDelete,
  onPressPlay,
}: IAccountRowProps): JSX.Element {
  const [label, setLabel] = useState<string>(item?.label || '')
  const [account, setAccount] = useState<string>(item?.account || '')
  const [password, setPassword] = useState<string>(item?.password || '')

  function onPressAddAccount() {
    const newAccount: IAccount = {
      label,
      account,
      password,
      uuid: uuidv4(),
    }
    if (addAccount && account && password) {
      addAccount(newAccount)
      setLabel('')
      setAccount('')
      setPassword('')
    }
  }

  function onPressEditAccount() {
    const newAccount: IAccount = {
      label,
      account,
      password,
      uuid: item?.uuid || uuidv4(),
    }
    if (editAccount && account && password) {
      editAccount(newAccount)
    }
  }

  return (
    <Surface style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.input} disabled={disabled} label="Label" value={label} onChangeText={setLabel} />
        <TextInput
          style={[styles.input, styles.inputMargins]}
          disabled={disabled}
          label="Compte"
          value={account}
          onChangeText={setAccount}
        />
        <TextInput
          style={styles.input}
          disabled={disabled}
          label="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
      </View>
      {addAccount && (
        <Button
          title="add account"
          onPress={onPressAddAccount}
          disabled={!account || !password}
        />
      )}
      <View style={styles.buttonsRow}>
        {editAccount && (
          <IconButton
            icon="pencil-outline"
            onPress={onPressEditAccount}
          />
        )}
        {onPressDelete && (
          <IconButton
            icon="delete"
            onPress={() => onPressDelete(item)}
            disabled={!account || !password}
          />
        )}
        {onPressPlay && (
          <IconButton
            icon="play"
            onPress={() => onPressPlay(item)}
            disabled={!account || !password}
          />
        )}
      </View>
    </Surface>
  )
}

export default AccountRow

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 16,
    flex: 1,
  },
  input: {
    flex: 1,
  },
  inputMargins: {
    marginHorizontal: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
  },
})
