import { X } from "lucide-react";
import React, { useState } from "react";

const AddMerchantModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    monthlyVolume: 10000,
    chargebackRatio: 0,
    status: "active",
    riskLevel: "low",
  });

  const [formErrors, setFormErrors] = useState({});
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!formData.country.trim()) {
      errors.country = "Country is required";
    }

    if (formData.monthlyVolume <= 0) {
      errors.monthlyVolume = "Monthly volume must be greater than 0";
    }

    if (formData.chargebackRatio < 0 || formData.chargebackRatio > 100) {
      errors.chargebackRatio = "Chargeback ratio must be between 0 and 100";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCancel = () => {
    // Clear form data and close
    setFormData({
      name: "",
      country: "",
      monthlyVolume: 10000,
      chargebackRatio: 0,
      status: "active",
      riskLevel: "low",
    });
    setFormErrors({});
    onClose();
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Merchant
                </h2>
                <p className="text-gray-500">
                  Fill in the merchant details below
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Form Fields Start */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Merchant Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter merchant name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.country ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter country name"
                  />
                  {formErrors.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.country}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Volume ($) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.monthlyVolume || 0}
                      onChange={(e) =>
                        handleInputChange(
                          "monthlyVolume",
                          Number(e.target.value)
                        )
                      }
                      className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        formErrors.monthlyVolume
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                  </div>
                  {formErrors.monthlyVolume && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.monthlyVolume}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chargeback Ratio (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.chargebackRatio}
                      onChange={(e) =>
                        handleInputChange(
                          "chargebackRatio",
                          Number(e.target.value)
                        )
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        formErrors.chargebackRatio
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      %
                    </span>
                  </div>
                  {formErrors.chargebackRatio && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.chargebackRatio}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Level
                  </label>
                  <select
                    value={formData.riskLevel}
                    onChange={(e) =>
                      handleInputChange("riskLevel", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Submint or Cancle */}
              <div className="mt-8 pt-6 border-t flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    Object.keys(formErrors).some((key) => formErrors[key]) ||
                    !formData.name ||
                    !formData.country
                  }
                >
                  Add Merchant
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMerchantModal;
