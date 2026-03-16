import React, { useState } from "react";
import { STATUS, PRIORITY } from "../../constants";
import { getEmptyJob } from "../../utils";

const JobModal = ({ job, onSave, onClose }) => {
  const [form, setForm] = useState(job || getEmptyJob());
  const [tagInput, setTagInput] = useState("");

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setField("tags", [...form.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag) =>
    setField("tags", form.tags.filter((t) => t !== tag));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const isValid = form.company.trim() && form.role.trim();

  return (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.6)", zIndex: 9999 }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div
          className="modal-content"
          style={{
            background: "var(--card-bg)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">
              {job?.id ? "✏️ Edit Application" : "➕ New Application"}
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Company *</label>
                <input
                  className="form-control form-control-sm"
                  value={form.company}
                  onChange={(e) => setField("company", e.target.value)}
                  placeholder="e.g. Stripe"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Role *</label>
                <input
                  className="form-control form-control-sm"
                  value={form.role}
                  onChange={(e) => setField("role", e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Location</label>
                <input
                  className="form-control form-control-sm"
                  value={form.location}
                  onChange={(e) => setField("location", e.target.value)}
                  placeholder="Remote / City, State"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Salary Range</label>
                <input
                  className="form-control form-control-sm"
                  value={form.salary}
                  onChange={(e) => setField("salary", e.target.value)}
                  placeholder="e.g. $120k–$150k"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-semibold">Status</label>
                <select
                  className="form-select form-select-sm"
                  value={form.status}
                  onChange={(e) => setField("status", e.target.value)}
                >
                  {STATUS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-semibold">Priority</label>
                <select
                  className="form-select form-select-sm"
                  value={form.priority}
                  onChange={(e) => setField("priority", e.target.value)}
                >
                  {PRIORITY.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-semibold">Applied Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={form.appliedDate}
                  onChange={(e) => setField("appliedDate", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Deadline</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={form.deadline}
                  onChange={(e) => setField("deadline", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-semibold">Job URL</label>
                <input
                  className="form-control form-control-sm"
                  value={form.url}
                  onChange={(e) => setField("url", e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className="col-12">
                <label className="form-label small fw-semibold">Tags</label>
                <div className="d-flex gap-2 mb-2 flex-wrap">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge rounded-pill"
                      style={{
                        background: "var(--tag-bg)",
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        fontSize: "0.72rem",
                      }}
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </span>
                  ))}
                </div>
                <div className="input-group input-group-sm">
                  <input
                    className="form-control"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add tag, press Enter"
                  />
                  <button className="btn btn-outline-secondary" onClick={addTag}>
                    Add
                  </button>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label small fw-semibold">Notes</label>
                <textarea
                  className="form-control form-control-sm"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  placeholder="Interview prep, referrals, key contacts..."
                />
              </div>
            </div>
          </div>

          <div className="modal-footer border-0 pt-0">
            <button className="btn btn-sm btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-sm btn-primary px-4"
              disabled={!isValid}
              onClick={() => onSave(form)}
            >
              {job?.id ? "Save Changes" : "Add Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
