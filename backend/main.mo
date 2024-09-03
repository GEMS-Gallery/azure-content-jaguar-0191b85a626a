import Array "mo:base/Array";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Debug "mo:base/Debug";

actor {
  // Define the TaxPayer type
  public type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Create a stable variable to store TaxPayer records
  private stable var taxPayerEntries : [(Text, TaxPayer)] = [];

  // Initialize the HashMap
  private var taxPayerStore = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

  // System functions for upgrades
  system func preupgrade() {
    taxPayerEntries := Iter.toArray(taxPayerStore.entries());
  };

  system func postupgrade() {
    taxPayerStore := HashMap.fromIter<Text, TaxPayer>(taxPayerEntries.vals(), 0, Text.equal, Text.hash);
    taxPayerEntries := [];
  };

  // Create a new TaxPayer record
  public func createTaxPayer(taxpayer: TaxPayer) : async Result.Result<(), Text> {
    switch (taxPayerStore.get(taxpayer.tid)) {
      case null {
        taxPayerStore.put(taxpayer.tid, taxpayer);
        #ok(())
      };
      case (?_) {
        #err("TaxPayer with TID " # taxpayer.tid # " already exists")
      };
    }
  };

  // Get all TaxPayer records
  public query func getAllTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayerStore.vals())
  };

  // Get a TaxPayer by TID
  public query func getTaxPayerByTID(tid: Text) : async ?TaxPayer {
    taxPayerStore.get(tid)
  };

  // Update a TaxPayer record
  public func updateTaxPayer(taxpayer: TaxPayer) : async Result.Result<(), Text> {
    switch (taxPayerStore.get(taxpayer.tid)) {
      case null {
        #err("TaxPayer with TID " # taxpayer.tid # " not found")
      };
      case (?_) {
        taxPayerStore.put(taxpayer.tid, taxpayer);
        #ok(())
      };
    }
  };

  // Delete a TaxPayer record
  public func deleteTaxPayer(tid: Text) : async Result.Result<(), Text> {
    switch (taxPayerStore.remove(tid)) {
      case null {
        #err("TaxPayer with TID " # tid # " not found")
      };
      case (?_) {
        #ok(())
      };
    }
  };
}
