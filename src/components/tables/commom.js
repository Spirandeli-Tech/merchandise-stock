
const colsSubscribers = [
  {
    Header: 'Nome',
    accessor: 'name',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Email',
    accessor: 'email',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Telefone',
    accessor: 'phone',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Plano',
    accessor: 'plan',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Status',
    accessor: 'status',
    cellClass: 'list-item-heading',
  },
];


const colsCompanies = [
  {
    Header: 'Nome',
    accessor: 'displayName',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Email',
    accessor: 'email',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Telefone',
    accessor: 'phone',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Responsável',
    accessor: 'owner',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Criação',
    accessor: 'createdAt',
    cellClass: 'list-item-heading',
  },

];

const colUsers = [
  {
    Header: 'Nome',
    accessor: 'name',
    cellClass: 'list-item-heading',
    
  },
  {
    Header: 'Email',
    accessor: 'email',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Data de Registro',
    accessor: 'date',
    cellClass: 'list-item-heading',
  },{
    Header: 'Status',
    accessor: 'admin',
    cellClass: 'list-item-heading',
  }
];

const colTransactions = [
  {
    Header: 'Nome',
    accessor: 'name',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Tipo de transação',
    accessor: 'type',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Método',
    accessor: 'method',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Data da transação',
    accessor: 'date',
    cellClass: 'list-item-heading',
  },

];

const colsAgents = [
  {
    Header: 'Nome',
    accessor: 'name',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Email',
    accessor: 'email',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Telefone',
    accessor: 'phone',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Agenciado',
    accessor: 'agencyName',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Informações',
    accessor: 'info',
    cellClass: 'list-item-heading',
  },
  {
    Header: 'Ações',
    accessor: 'edit',
    cellClass: 'list-item-heading',
  }

];


export { colsSubscribers, colUsers, colsCompanies, colTransactions, colsAgents }
