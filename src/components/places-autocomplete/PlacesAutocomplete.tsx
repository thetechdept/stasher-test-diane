import { FC, useState, useEffect } from 'react'
import { AutoComplete, Button, Input, Typography } from 'antd'

import { MdOutlinePlace, MdMyLocation } from 'react-icons/md'
import usePlacesAutocomplete from 'use-places-autocomplete'
import { BaseOptionType } from 'rc-tree-select/lib/TreeSelect'
import { SizeType } from 'antd/es/config-provider/SizeContext'

interface PlacesAutcompleteProps {
  loaded: boolean
  onSelect: (value: string) => void
  size: SizeType
  address?: string
}

const { Text } = Typography

const PlacesAutocomplete: FC<PlacesAutcompleteProps> = ({
  onSelect,
  loaded,
  size,
  address,
}) => {
  const {
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300, initOnMount: loaded })

  const [options, setOptions] = useState<BaseOptionType[]>([])
  const handleChange = (inputValue: string) => {
    setValue(inputValue)
  }

  const handleSelect = (value: string) => {
    onSelect(value)
    clearSuggestions()
  }

  useEffect(() => {
    if (data) {
      let items = data.map((item) => ({
        value: item.description,
        label: (
          <>
            <Text strong>{item.structured_formatting.main_text}</Text>
            <Text style={{ fontSize: 12 }}>
              {' '}
              {item.structured_formatting.secondary_text}
            </Text>
          </>
        ),
      }))
      setOptions(items)
    }

    return () => {}
  }, [data])

  return (
    <AutoComplete
      options={options}
      style={{ width: '100%' }}
      onSelect={handleSelect}
      onChange={handleChange}
      disabled={!loaded}
      defaultValue={address}
      allowClear
    >
      <Input
        value={address}
        size={size}
        name="location"
        placeholder="Enter a location"
        className="custom"
        required
        style={{ height: 50 }}
        prefix={<MdOutlinePlace />}
        suffix={
          <Button
            onClick={() => console.log('clicked!')}
            icon={<MdMyLocation />}
            type="link"
          />
        }
      />
    </AutoComplete>
  )
}

export default PlacesAutocomplete
