/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RouteTreeImport } from './routes/routeTree'
import { Route as RootImport } from './routes/root'
import { Route as LoginImport } from './routes/login'
import { Route as ProdutosProdutosImport } from './routes/produtos/produtos'
import { Route as CategoriasCategoriasImport } from './routes/categorias/categorias'

// Create/Update Routes

const RouteTreeRoute = RouteTreeImport.update({
  path: '/routeTree',
  getParentRoute: () => rootRoute,
} as any)

const RootRoute = RootImport.update({
  path: '/root',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const ProdutosProdutosRoute = ProdutosProdutosImport.update({
  path: '/produtos/produtos',
  getParentRoute: () => rootRoute,
} as any)

const CategoriasCategoriasRoute = CategoriasCategoriasImport.update({
  path: '/categorias/categorias',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/root': {
      preLoaderRoute: typeof RootImport
      parentRoute: typeof rootRoute
    }
    '/routeTree': {
      preLoaderRoute: typeof RouteTreeImport
      parentRoute: typeof rootRoute
    }
    '/categorias/categorias': {
      preLoaderRoute: typeof CategoriasCategoriasImport
      parentRoute: typeof rootRoute
    }
    '/produtos/produtos': {
      preLoaderRoute: typeof ProdutosProdutosImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  LoginRoute,
  RootRoute,
  RouteTreeRoute,
  CategoriasCategoriasRoute,
  ProdutosProdutosRoute,
])

/* prettier-ignore-end */
