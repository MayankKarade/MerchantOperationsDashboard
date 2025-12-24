import { AlertTriangle, X } from "lucide-react";
import React, { useState } from "react";

const EditMerchantModal = ({ merchant, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(merchant || {});
  const [formErrors, setFormErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen || !merchant) return null;

  const validateForm = () => {
    const errors = {};
    if (!formData.name?.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!formData.country?.trim()) {
      errors.country = "Country is required";
    }

    if (formData.monthlyVolume <= 0) {
      errors.monthlyVolume = "Monthly volume must be greater than 0";
    }

    if (formData.chargebackRatio < 0 || formData.chargebackRatio > 100) {
      errors.chargebackRatio = "Chargeback ratio must be between 0 and 100";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    const filledData = { ...formData, [field]: value };

    setFormData(filledData);

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Checking weither we need to show confirmation

    if (
      field === "status" &&
      value === "active" &&
      filledData.riskLevel === "high"
    ) {
      setShowConfirm(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (formData.chargebackRatio > 2 && formData.status === "active") {
      if (
        !window.confirm(
          `Warning: This merchant has a chargeback ratio of ${formData.chargebackRatio}%, which exceeds the 2% threshold. Do you want to proceed?`
        )
      ) {
        return;
      }
    }
    onUpdate(formData);
    onClose();
  };

  const handleCancel = () => {
    setFormData(merchant);
    setFormErrors({});
    setShowConfirm(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Merchant
                </h2>
                <p className="text-gray-500">Update merchant information</p>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Confirmation Modal for High Risk Active Status */}
            {showConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-md">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="text-yellow-600 mr-3" size={24} />
                    <h3 className="text-lg font-semibold">
                      Confirm Status Change
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    You are attempting to set status to <strong>Active</strong>{" "}
                    while risk level is <strong>High</strong>. Are you sure you
                    want to proceed?
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowConfirm(false);
                        // Continue with save
                      }}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Merchant Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
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

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country || ""}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.country ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter merchant name"
                  />
                  {formErrors.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.country}
                    </p>
                  )}
                </div>

                {/* Monthly Volume */}
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

                {/* Chargeback Ratio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chargeback Ratio (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.chargebackRatio || 0}
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

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status || "active"}
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

                {/* Risk Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Level
                  </label>
                  <select
                    value={formData.riskLevel || "low"}
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

              {/* Business Rules Warning */}
              {formData.chargebackRatio > 2 && formData.status === "active" && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="text-yellow-600 mr-3" size={20} />
                    <div>
                      <p className="font-medium text-yellow-800">
                        High Chargeback Warning
                      </p>
                      <p className="text-yellow-700 text-sm">
                        This merchant has a chargeback ratio of{" "}
                        {formData.chargebackRatio}%, which exceeds the 2%
                        threshold.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Actions */}
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
                  disabled={Object.keys(formErrors).some(
                    (key) => formErrors[key]
                  )}
                >
                  Update Merchant
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMerchantModal;
