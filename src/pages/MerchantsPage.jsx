import React, { useEffect, useState } from "react";
import { merchantsData } from "../data/marchantsData";
import { Plus } from "lucide-react";
import MerchantFilters from "../components/merchants/MerchantFilters";
import MerchantTable from "../components/merchants/MerchantTable";
import MerchantDetail from "../components/merchants/MerchantDetail";
import EditMerchantModal from "../components/merchants/Modal/EditMerchantModal";
import AddMerchantModal from "../components/merchants/Modal/AddMerchantModal";
const MerchantsPage = () => {
  const [allMerchants, setAllMerchants] = useState([]);
  const [filteredMerchants, setFilteredMerchants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [editingMerchant, setEditingMerchant] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAllMerchants(merchantsData);
      setFilteredMerchants(merchantsData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let allMerchantsData = [...allMerchants];

    if (searchTerm) {
      allMerchantsData = allMerchantsData.filter((merchant) =>
        merchant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      allMerchantsData = allMerchantsData.filter(
        (merchant) => merchant.status === statusFilter
      );
    }

    if (riskFilter) {
      allMerchantsData = allMerchantsData.filter(
        (merchant) => merchant.riskLevel === riskFilter
      );
    }

    if (sortBy === "volume_high") {
      allMerchantsData.sort((a, b) => b.monthlyVolume - a.monthlyVolume);
    } else if (sortBy === "volume_low") {
      allMerchantsData.sort((a, b) => a.monthlyVolume - b.monthlyVolume);
    } else if (sortBy === "chargeback_high") {
      allMerchantsData.sort((a, b) => b.chargebackRatio - a.chargebackRatio);
    } else if (sortBy === "chargeback_low") {
      allMerchantsData.sort((a, b) => a.chargebackRatio - b.chargebackRatio);
    }

    setFilteredMerchants(allMerchantsData);
  }, [allMerchants, searchTerm, statusFilter, riskFilter, sortBy]);

  const handleUpdateMerchant = (updateMerchant) => {
    setAllMerchants((prev) =>
      prev.map((merchant) =>
        merchant?.id === updateMerchant?.id ? updateMerchant : merchant
      )
    );
    setEditingMerchant(null);
  };

  const handleAddMerchant = (newMerchant) => {
    const merchantWithId = {
      ...newMerchant,
      id: Date.now(),
      joinDate: new Date().toISOString().split("T")[0],
      totalTransactions: 0,
    };
    setAllMerchants((prev) => [...prev, merchantWithId]);
    setShowAddForm(false);

    alert(`Merchant "${newMerchant.name}" added successfully!`);
  };

  const handleDeleteMerchant = (merchantId) => {
    if (window.confirm("Are you sure you want to delete this merchant?")) {
      setAllMerchants((prev) =>
        prev.filter((merchant) => merchant.id !== merchantId)
      );
      //   if (selectedMerchant?.id === merchantId) {
      //     setSelectedMerchant(null);
      //   }
      //   if (editingMerchant?.id === merchantId) {
      //     setEditingMerchant(null);
      //   }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
        <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900"> Merchants</h1>
          <p className="text-gray-600">Manage and monitor merchant accounts</p>
        </div>
        <button
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} />
          <span>Add Merchant</span>
        </button>
      </div>
      <MerchantFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Merchants List</h3>
            <span className="text-sm text-gray-500">
              {filteredMerchants?.length} of {allMerchants?.length} merchants
            </span>
          </div>
        </div>

        <MerchantTable
          merchants={filteredMerchants}
          onMerchantClick={setSelectedMerchant}
          onEditMerchant={setEditingMerchant}
          onDeleteMerchant={handleDeleteMerchant}
        />
      </div>

      <div>
        <MerchantDetail
          merchant={selectedMerchant}
          isOpen={!!selectedMerchant}
          onClose={() => setSelectedMerchant(null)}
        />
      </div>
      <div>
        <EditMerchantModal
          merchant={editingMerchant}
          isOpen={!!editingMerchant}
          onClose={() => setEditingMerchant(null)}
          onUpdate={handleUpdateMerchant}
        />
      </div>
      {showAddForm && (
        <AddMerchantModal
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddMerchant}
        />
      )}
    </div>
  );
};

export default MerchantsPage;
