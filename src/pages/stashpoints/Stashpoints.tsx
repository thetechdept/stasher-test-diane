import { useEffect, useState, FC } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import qs from 'query-string'

import { Affix, Button, Divider, Empty, Space, theme, Typography } from 'antd'
import Layout from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import Title from 'antd/es/typography/Title'
import StashpointItem from './partials/stashpoint-item/StashpointItem'
import { MdFilterList, MdOutlineWest } from 'react-icons/md'

import SearchForm from 'components/search-form/SearchForm'
import StashpointsMap from './partials/stashpoint-map/StashpointsMap'

const apiUrl = process.env.REACT_APP_API

const { Text } = Typography

const spacing = 16
const Stashpoints: FC<{ isMapLoaded: boolean }> = ({ isMapLoaded }) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [stashpoints, setStashpoints] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [address, setAddress] = useState<string>()

  const [showFilters, setShowFilters] = useState(true)

  const {
    token: { colorTextBase, colorBgContainer, sizeSM },
  } = theme.useToken()

  useEffect(() => {
    const searchParamsObj = Object.fromEntries(
      new URLSearchParams(searchParams.toString())
    )
    const { address, ...restParams } = searchParamsObj
    setAddress(address)

    const abortController = new AbortController()
    setIsLoading(true)
    fetch(`${apiUrl}/stashpoints?${qs.stringify(restParams)}`, {
      signal: abortController.signal,
    })
      .then(async (res) => {
        const results = await res.json()
        console.log('results', results)
        setStashpoints(results?.items)
        setTotalItems(results?.total)
      })
      .catch((err) => {
        if (abortController.signal.aborted) return
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      abortController.abort()
    }
  }, [searchParams])

  return (
    <Layout
      style={{
        height: '100%',
      }}
    >
      <Sider
        width={450}
        style={{
          height: '100%',
          background: colorBgContainer,
          overflow: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Affix
          style={{
            padding: spacing,
          }}
        >
          <div>
            <Space
              size={4}
              align="center"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <Space size={4}>
                <Button
                  type="link"
                  icon={<MdOutlineWest size={24} color={colorTextBase} />}
                  onClick={() => navigate('/')}
                />
                <Title style={{ marginTop: spacing }} level={4}>
                  Stashpoints
                </Title>
              </Space>
              <div style={{ display: 'flex' }}>
                <Button
                  size="small"
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                  <MdFilterList />
                </Button>
              </div>
            </Space>
            {showFilters && (
              <SearchForm size="small" isMapLoaded={isMapLoaded} />
            )}
          </div>
        </Affix>
        <Divider />
        <div
          style={{
            paddingLeft: spacing,
            paddingRight: spacing,
          }}
        >
          {stashpoints.length > 0 ? (
            <Text type="secondary" style={{ fontSize: sizeSM }}>
              <Text type="secondary" strong>
                {totalItems}
              </Text>{' '}
              stashpoints found in{' '}
              <Text type="secondary" strong>
                {address}
              </Text>
            </Text>
          ) : (
            ''
          )}
          <Space
            style={{
              width: '100%',
              marginBottom: spacing,
            }}
            direction="vertical"
            size={16}
          >
            {stashpoints?.map((item: Record<string, string>) => (
              <StashpointItem loading={isLoading} item={item} key={item.id} />
            ))}
            {!isLoading && stashpoints.length === 0 ? (
              <Empty description="No stashpoint available in this location" />
            ) : (
              ''
            )}
          </Space>
        </div>
      </Sider>
      <div
        style={{ height: 'calc(100vh - 64px)', width: 'calc(100vw - 450px' }}
      >
        {isMapLoaded && <StashpointsMap stashpoints={stashpoints} />}
      </div>
    </Layout>
  )
}

export default Stashpoints
