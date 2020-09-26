export default [{ anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' }, { indexed: true, internalType: 'uint256', name: 'contentType', type: 'uint256' }], name: 'ABIChanged', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' }, { indexed: false, internalType: 'address', name: 'a', type: 'address' }], name: 'AddrChanged', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' }, { indexed: false, internalType: 'uint256', name: 'coinType', type: 'uint256' }, { indexed: false, internalType: 'bytes', name: 'newAddress', type: 'bytes' }], name: 'AddressChanged', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' }, { indexed: false, internalType: 'bytes', name: 'hash', type: 'bytes' }], name: 'ContenthashChanged', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' }, { indexed: true, internalType: 'bytes4', name: 'interfaceID', type: 'bytes4' }, { indexed: false, internalType: 'address', name: 'implementer', type: 'address' }], name: 'InterfaceChanged', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' }, { indexed: false, internalType: 'string', name: 'name', type: 'string' }], name: 'NameChanged', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' }, { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }], name: 'OwnershipTransferred', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' }, { indexed: false, internalType: 'bytes32', name: 'x', type: 'bytes32' }, { indexed: false, internalType: 'bytes32', name: 'y', type: 'bytes32' }], name: 'PubkeyChanged', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'bytes32', name: 'node', type: 'bytes32' }, { indexed: true, internalType: 'string', name: 'indexedKey', type: 'string' }, { indexed: false, internalType: 'string', name: 'key', type: 'string' }], name: 'TextChanged', type: 'event' }, { constant: true, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'uint256', name: 'contentTypes', type: 'uint256' }], name: 'ABI', outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }, { internalType: 'bytes', name: '', type: 'bytes' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }], name: 'addr', outputs: [{ internalType: 'address payable', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'uint256', name: 'coinType', type: 'uint256' }], name: 'addr', outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }], name: 'contenthash', outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'bytes4', name: 'interfaceID', type: 'bytes4' }], name: 'interfaceImplementer', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'isOwner', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ internalType: 'address', name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }], name: 'pubkey', outputs: [{ internalType: 'bytes32', name: 'x', type: 'bytes32' }, { internalType: 'bytes32', name: 'y', type: 'bytes32' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'renounceOwnership', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'uint256', name: 'contentType', type: 'uint256' }, { internalType: 'bytes', name: 'data', type: 'bytes' }], name: 'setABI', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'uint256', name: 'coinType', type: 'uint256' }, { internalType: 'bytes', name: 'a', type: 'bytes' }], name: 'setAddr', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'address', name: 'a', type: 'address' }], name: 'setAddr', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'bytes', name: 'hash', type: 'bytes' }], name: 'setContenthash', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'bytes4', name: 'interfaceID', type: 'bytes4' }, { internalType: 'address', name: 'implementer', type: 'address' }], name: 'setInterface', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'string', name: 'name', type: 'string' }], name: 'setName', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'bytes32', name: 'x', type: 'bytes32' }, { internalType: 'bytes32', name: 'y', type: 'bytes32' }], name: 'setPubkey', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'string', name: 'key', type: 'string' }, { internalType: 'string', name: 'value', type: 'string' }], name: 'setText', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [{ internalType: 'bytes4', name: 'interfaceID', type: 'bytes4' }], name: 'supportsInterface', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], payable: false, stateMutability: 'pure', type: 'function' }, { constant: true, inputs: [{ internalType: 'bytes32', name: 'node', type: 'bytes32' }, { internalType: 'string', name: 'key', type: 'string' }], name: 'text', outputs: [{ internalType: 'string', name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }], name: 'transferOwnership', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }]
