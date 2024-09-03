export const idlFactory = ({ IDL }) => {
  const TaxPayer = IDL.Record({
    'tid' : IDL.Text,
    'address' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'createTaxPayer' : IDL.Func([TaxPayer], [Result], []),
    'deleteTaxPayer' : IDL.Func([IDL.Text], [Result], []),
    'getAllTaxPayers' : IDL.Func([], [IDL.Vec(TaxPayer)], ['query']),
    'getTaxPayerByTID' : IDL.Func([IDL.Text], [IDL.Opt(TaxPayer)], ['query']),
    'updateTaxPayer' : IDL.Func([TaxPayer], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
