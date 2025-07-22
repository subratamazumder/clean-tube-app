# Makefile
.PHONY: run push version

# Get current version from package.json
CURRENT_VERSION := $(shell node -p "require('./package.json').version")

# Increment patch version (1.0.0 → 1.0.1)
version:
	@echo "Current version: $(CURRENT_VERSION)"
	@npm version patch --no-git-tag-version
	@echo "New version: $(shell node -p "require('./package.json').version")"

# Push with version bump
.PHONY: push
push: version
	@read -p "Enter commit message (or leave empty for default): " COMMIT_MSG; \
	NEW_VERSION=$$(node -p "require('./package.json').version"); \
	DEFAULT_MSG="chore: bump version to v$$NEW_VERSION"; \
	FINAL_MSG=$${COMMIT_MSG:-$$DEFAULT_MSG}; \
	echo "🚀 Version: $$NEW_VERSION"; \
	echo "📝 Commit message: $$FINAL_MSG"; \
	git add . && \
	git commit -m "$$FINAL_MSG" && \
	git tag -a "v$$NEW_VERSION" -m "$$FINAL_MSG" && \
	git push origin $(shell git rev-parse --abbrev-ref HEAD) && \
	git push origin "v$$NEW_VERSION" || \
	{ echo "❌ Push failed"; exit 1; }
run:
	@. ${HOME}/.nvm/nvm.sh && nvm use 22; \
	if [ ! -d "node_modules" ] || [ "package-lock.json" -nt "node_modules" ]; then \
		echo "📦 Installing dependencies..."; \
		npm ci --silent; \
	else \
		echo "✓ Dependencies already up-to-date"; \
	fi; \
	echo "🔧 Starting development server..."; \
	npm run dev