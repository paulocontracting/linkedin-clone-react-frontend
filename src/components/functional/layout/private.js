import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { Layout, Menu, Row, Col, Icon } from 'antd'
import Loadable from 'react-loadable'

import Logo from '../../../assets/images/logo.png'

class PrivateLayout extends Component {
  static Container = props => (
    <Row
      type='flex'
      justify='center'
      style={{ margin: '50px', minHeight: '100vh' }}
    >
      <Col span={18}>{props.children}</Col>
    </Row>
  );

  static LazyHome = Loadable({
    loader: () => import('../../../pages/home'),
    loading () {
      return <div>Loading...</div>
    }
  });

  static LazyUsers = Loadable({
    loader: () => import('../../../pages/users'),
    loading () {
      return <div>Loading...</div>
    }
  });

  static LazyCompanies = Loadable({
    loader: () => import('../../../pages/companies'),
    loading () {
      return <div>Loading...</div>
    }
  });

  static LazyCompaniesNew = Loadable({
    loader: () => import('../../../pages/companies/new'),
    loading () {
      return <div>Loading...</div>
    }
  });

  render = () => {
    if (['/auth', '/'].indexOf(this.props.history.location.pathname) > -1) {
      return <Redirect to='/home' />
    }

    return <Layout>
      <Layout.Sider width={200} style={{ background: '#fff' }} collapsible collapsed trigger={null}>
        <Menu style={{ borderRight: 0 }} mode='inline' selectable={false}>
          <Menu.Item key='logo'>
            <NavLink to='/home'>
              <img src={Logo} alt='logo' style={{ width: '16px' }} />
            </NavLink>
          </Menu.Item>
          <Menu.Item key='users'>
            <NavLink to='/users'>
              <Icon type='smile' theme='filled' />
              <span>Users</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key='companies'>
            <NavLink to='/companies'>
              <Icon type='bank' theme='filled' />
              <span>Companies</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content>
        <PrivateLayout.Container>
          <Switch>
            <Route exact path='/home' component={PrivateLayout.LazyHome} />
            <Route exact path='/users' component={PrivateLayout.LazyUsers} />
            <Route exact path='/companies' component={PrivateLayout.LazyCompanies} />
            <Route exact path='/companies/new' component={PrivateLayout.LazyCompaniesNew} />
          </Switch>
        </PrivateLayout.Container>
      </Layout.Content>
    </Layout>
  };
}

PrivateLayout.propTypes = {
  history: PropTypes.object
}

export default PrivateLayout
