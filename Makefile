publish:
	git checkout published && git rebase main && git push -f origin published && git checkout main