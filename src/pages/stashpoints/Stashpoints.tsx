import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { Button, Divider, Empty, Space, theme } from "antd"
import Layout from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import Title from "antd/es/typography/Title"
import StashpointItem from './partials/stashpoint-item/StashpointItem'
import { MdOutlineWest } from 'react-icons/md'

import SearchForm from 'components/search-form/SearchForm'

const apiUrl = process.env.REACT_APP_API

const spacing = 16
const Stashpoints = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [stashpoints, setStashpoints] = useState([])
  const {
    token: { colorTextBase, colorBgContainer },
  } = theme.useToken()

  useEffect(() => {
    const abortController = new AbortController()
    setIsLoading(true)
    fetch(`${apiUrl}/stashpoints?${searchParams}`, {
      signal: abortController.signal,
    })
      .then(async (res) => {
        const results = await res.json()
        console.log('results', results)
        setStashpoints(results?.items)

      })
      .catch((err) => {
        if (abortController.signal.aborted) return
        console.log(err)
      })
      .finally(()=>{
        setIsLoading(false)
      })

    return () => {
      abortController.abort()
    }
  }, [searchParams])

  return (
    <Layout style={{
      height: '100%',
    }}>
      <Sider width={450} style={{
        height: '100%',
        background: colorBgContainer,
      }}
      >
        <div
          style={{
            padding: spacing,
          }}
        >
          <Space size={4} align="center">
            <Button
              type="link"
              icon={<MdOutlineWest size={24} color={colorTextBase} />}
              onClick={() => navigate('/')}
            />
            <Title style={{ marginTop: spacing }} level={4}>Stashpoints</Title>
          </Space>
          <SearchForm size="small" />
        </div>
        <Divider />
        <div
          style={{
            height: 'calc(100% - 140px)',
            overflowY: 'auto',
            paddingLeft: spacing,
            paddingRight: spacing,
          }}
        >
          <Space
            style={{
              width: '100%',
              marginBottom: spacing
            }}
            direction="vertical"
            size={16}
          >
            {
              stashpoints?.map((item: Record<string, string>) => (
                <StashpointItem loading={isLoading} item={item} key={item.id} />
              ))
            }
            {
              !isLoading && stashpoints.length === 0
                ? <Empty
                  description="No stashpoint available in this location"
                /> : ''
            }
          </Space>
        </div>
      </Sider>
    </Layout>
  )
}

export default Stashpoints