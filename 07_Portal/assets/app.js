const Portal = (() => {
  const repoBase = "https://github.com/khempaphatama-bas/parq-integration";

  const navItems = [
    ["index.html", "Home"],
    ["project.html", "Project"],
    ["discovery.html", "Discovery"],
    ["architecture.html", "Architecture"],
    ["delivery.html", "Delivery"],
    ["qa.html", "QA"],
    ["work-by-role.html", "Work by Role"]
  ];

  function currentPage() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    return path;
  }

  function renderNav() {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const active = currentPage();
    nav.innerHTML = navItems.map(([href, label]) => {
      const cls = href === active ? "active" : "";
      return `<a class="${cls}" href="${href}">${label}</a>`;
    }).join("");
  }

  function statusClass(value) {
    const v = String(value || "").toLowerCase();
    if (v.includes("blocked") || v.includes("unavailable") || v === "high") return "status-blocked";
    if (v.includes("needs decision") || v.includes("open") || v.includes("pending")) return "status-needs-decision";
    if (v.includes("draft")) return "status-draft";
    if (v.includes("ready for next owner") || v.includes("ready")) return "status-ready";
    if (v.includes("superseded")) return "status-superseded";
    if (v.includes("approved") || v.includes("source of truth")) return "status-approved";
    if (v.includes("current working baseline") || v.includes("current") || v.includes("complete")) return "status-current";
    if (v.includes("reference") || v === "medium") return "status-reference";
    return "status-current";
  }

  function standardStatus(value) {
    const v = String(value || "").toLowerCase();
    if (v.includes("approved") || v.includes("source of truth")) return "Approved / Source of Truth";
    if (v.includes("blocked") || v.includes("unavailable")) return "Blocked";
    if (v.includes("needs decision") || v.includes("open") || v.includes("pending")) return "Needs Decision";
    if (v.includes("draft")) return "Draft";
    if (v.includes("superseded")) return "Superseded";
    if (v.includes("ready")) return "Ready for Next Owner";
    if (v.includes("current") || v.includes("complete") || v.includes("done")) return "Current Working Baseline";
    return value || "Current Working Baseline";
  }

  function badge(value) {
    return `<span class="badge ${statusClass(value)}">${escapeHtml(value || "Not set")}</span>`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizeRepoPath(path) {
    if (!path) return "";
    let clean = String(path).split("#")[0];
    const query = clean.includes("?") ? clean.slice(clean.indexOf("?")) : "";
    clean = clean.split("?")[0];
    if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;
    if (clean.startsWith("../")) clean = clean.slice(3);
    if (clean.startsWith("./")) clean = clean.slice(2);
    if (clean.endsWith(".html") && !clean.startsWith("07_Portal/")) clean = `07_Portal/${clean}`;
    return decodeURIComponent(clean) + query;
  }

  function githubUrl(path) {
    const repoPath = normalizeRepoPath(path);
    if (!repoPath) return "";
    if (repoPath.startsWith("http://") || repoPath.startsWith("https://")) return repoPath;
    const clean = repoPath.split("?")[0].replace(/^\/+/, "");
    const mode = clean.endsWith("/") || !clean.includes(".") ? "tree" : "blob";
    return `${repoBase}/${mode}/main/${clean.replaceAll(" ", "%20")}`;
  }

  function sourceLabel(path) {
    const repoPath = normalizeRepoPath(path);
    if (!repoPath) return "Not specified";
    if (repoPath.startsWith(repoBase)) return repoPath.replace(`${repoBase}/blob/main/`, "").replace(`${repoBase}/tree/main/`, "");
    return repoPath.split("?")[0];
  }

  function externalLink(url, label) {
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  }

  function sourceLink(path, label = "Open Source") {
    if (!path) return "";
    const url = githubUrl(path);
    const display = sourceLabel(path);
    return `<div class="source-artifact"><div class="source-path"><span class="meta-label">Source Artifact</span><code>${escapeHtml(display)}</code></div><div class="source-actions">${externalLink(url, label)} ${externalLink(url, "View on GitHub")}</div></div>`;
  }

  async function loadJson(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Unable to load ${path}`);
    return res.json();
  }

  function applyMeta(data) {
    const last = document.getElementById("lastUpdated");
    const source = document.getElementById("sourceArtifact");
    if (last) last.textContent = data.lastUpdated || "Not set";
    if (source && data.sourceArtifact) source.outerHTML = sourceLink(data.sourceArtifact, "Open Source");
  }

  function relatedLinks({ feature, system, artifact, userFlowId }) {
    const links = [];
    if (userFlowId && userFlowId !== "Not specified") {
      links.push(`<a href="architecture-diagrams.html?uf=${encodeURIComponent(userFlowId)}">${escapeHtml(userFlowId)}</a>`);
    }
    if (system) links.push(`<a href="project-controls.html?system=${encodeURIComponent(system)}">${escapeHtml(system)}</a>`);
    if (artifact) links.push(sourceLink(artifact, "Artifact"));
    if (feature) links.push(escapeHtml(feature));
    return links.join(" · ");
  }

  function tableRows(items, columns) {
    return items.map(item => `<tr>${columns.map(col => `<td>${col.render ? col.render(item) : escapeHtml(item[col.key])}</td>`).join("")}</tr>`).join("");
  }

  function filterByQuery(items) {
    const params = new URLSearchParams(window.location.search);
    const uf = params.get("uf");
    const system = params.get("system");
    if (uf) {
      return items.filter(item => String(item.relatedUserFlowId || item.notes || item.question || "").includes(uf));
    }
    if (system) {
      return items.filter(item => String(item.system || item.role || item.openItems || "").toLowerCase().includes(system.toLowerCase()));
    }
    return items;
  }

  document.addEventListener("DOMContentLoaded", renderNav);

  return { badge, escapeHtml, sourceLink, loadJson, applyMeta, relatedLinks, tableRows, filterByQuery, standardStatus };
})();
