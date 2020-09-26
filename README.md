# ens-link

ENS management for Chainlink feeds

⚠️ Warning: This project is a proof of concept - Do NOT use on mainnet - Tested on Ropsten ⚠️

# Notes

### PRD Features:

- Register ENS subdomains for feeds
- Update addresses of feeds
- Any additional helpful functionality

### Scoping Questions

- Do we expect the end user to be technical? (is this a CLI tool or is a GUI important?)
- How do we plan to access the node's keys? Assumed to be the email/password from a node login
- What do we want to resolve to? Addresses? Anything?
- Do we want one node to manage others or each one to manage themself?
- When horizontally scaling out nodes, how do we plan to keep track of them?

### Future Improvements

- Encrypting of local configuration
- React.js GUI
- Additional unit & integration testing
- Validate ABIs in 'init' hook
- Persisting multiple network's ENS contract ABIs and loading them with dynamic imports depending on the network
- Integration into Chainlink nodes
- Integration with cloud providers and support for automatically registering subdomains of scaled nodes
- Ability to add content to ENS domains
- Reverse resolution setup
- Additonal commands such as changing ownership
- Custom resolver functionality

# Table of Contents
<!-- toc -->
* [ens-link](#ens-link)
* [Table of Contents](#table-of-contents)
* [Usage](#usage)
* [Commands](#commands)
* [Getting started for local development](#getting-started-for-local-development)
* [Testing](#testing)
* [Technology documentation](#technology-documentation)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g ens-link
$ ens-link COMMAND
running command...
$ ens-link (-v|--version|version)
ens-link/0.0.0 darwin-x64 node-v12.16.3
$ ens-link --help [COMMAND]
USAGE
  $ ens-link COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`ens-link abi`](#ens-link-abi)
* [`ens-link client`](#ens-link-client)
* [`ens-link configure`](#ens-link-configure)
* [`ens-link content`](#ens-link-content)
* [`ens-link help [COMMAND]`](#ens-link-help-command)
* [`ens-link register`](#ens-link-register)
* [`ens-link renew`](#ens-link-renew)
* [`ens-link subdomain`](#ens-link-subdomain)

## `ens-link abi`

Pulls the latest ABIs using the configured network

```
USAGE
  $ ens-link abi

OPTIONS
  -h, --help           show CLI help
  -k, --apiKey=apiKey  [default: YourApiKeyToken] Optional Etherscan API key to avoid rate limits

EXAMPLE
  $ ens-link abi --apiKey=22e1e1d2d222
```

_See code: [src/commands/abi.ts](https://github.com/justinkaseman/ens-link/blob/v0.0.0/src/commands/abi.ts)_

## `ens-link client`

Starts ENS-LINK's graphical interface

```
USAGE
  $ ens-link client

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ ens-link client
```

_See code: [src/commands/client.ts](https://github.com/justinkaseman/ens-link/blob/v0.0.0/src/commands/client.ts)_

## `ens-link configure`

Configures network endpoint and account settings

```
USAGE
  $ ens-link configure

OPTIONS
  -e, --email=email        endpoint to connect to
  -h, --help               show CLI help
  -n, --endpoint=endpoint  endpoint to connect to
  -p, --password=password  endpoint to connect to

EXAMPLE
  $ ens-link configure --email=justinkaseman@live.com --password=mypassword --endpoint=https://infura.something.com
```

_See code: [src/commands/configure.ts](https://github.com/justinkaseman/ens-link/blob/v0.0.0/src/commands/configure.ts)_

## `ens-link content`

Adds content to a domain or subdomain

```
USAGE
  $ ens-link content

OPTIONS
  -d, --content=content
  -h, --help             show CLI help
  -s, --domain=domain    The name of the domain to add content to

EXAMPLE
  $ ens-link content --domain=justino.eth --content=0x52ea2030b67da5e0996f190c7e140fbcc51a5c79
```

_See code: [src/commands/content.ts](https://github.com/justinkaseman/ens-link/blob/v0.0.0/src/commands/content.ts)_

## `ens-link help [COMMAND]`

display help for ens-link

```
USAGE
  $ ens-link help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `ens-link register`

Register a feed with an ENS address

```
USAGE
  $ ens-link register

OPTIONS
  -d, --duration   name to print
  -h, --help       show CLI help
  -n, --name=name  name to register

EXAMPLE
  $ ens-link register --name=flavortown --duration=30
```

_See code: [src/commands/register.ts](https://github.com/justinkaseman/ens-link/blob/v0.0.0/src/commands/register.ts)_

## `ens-link renew`

Starts ENS-LINK's graphical interface

```
USAGE
  $ ens-link renew

OPTIONS
  -d, --duration=duration  Amount of time (days) to extend ownership for
  -h, --help               show CLI help
  -n, --name=name          Domain name to renew

EXAMPLE
  $ ens-link renew --name=flavortown --duration=30
```

_See code: [src/commands/renew.ts](https://github.com/justinkaseman/ens-link/blob/v0.0.0/src/commands/renew.ts)_

## `ens-link subdomain`

Register a feed with an ENS address

```
USAGE
  $ ens-link subdomain

OPTIONS
  -d, --domain=domain
  -h, --help                 show CLI help
  -s, --subdomain=subdomain  name to print

EXAMPLE
  $ ens-link subdomain --subdomain=first --domain=justino.eth
```

_See code: [src/commands/subdomain.ts](https://github.com/justinkaseman/ens-link/blob/v0.0.0/src/commands/subdomain.ts)_
<!-- commandsstop -->

# Getting started for local development

To setup this project locally, clone the repository, and install the necessary dependencies.

```shell
git clone https://github.com/justinkaseman/ENS-LINK.git && cd ENS-LINK && yarn && cd ./src/client && yarn && cd ../..
```

Run commands from the root of the project using
```shell
./bin/run [COMMAND]
```

To make this a little bit friendlier a link can be used to simulate a global install, allowing commands to be run with `ens-link`
```shell
npm link
```

# Testing

```shell
yarn test
```

# Technology documentation

[oclif](https://oclif.io/docs/introduction) - an open source framework for building a command line interface (CLI) in Node.js

[TypeScript](https://www.typescriptlang.org/docs/) - an open-source language which builds on JavaScript by adding static type definitions

[Ethers.js](https://docs.ethers.io/v5/) - complete and compact JavaScript library for interacting with the Ethereum Blockchain and its ecosystem.

[Ethereum Name Service](https://docs.ens.domains/) - a distributed, open, and extensible naming system based on the Ethereum blockchain.
