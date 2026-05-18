<script lang="ts">
import type { InfoItem } from "$lib/types";

type Props = {
	items: InfoItem[];
	open: boolean;
	onClose: () => void;
};

let { items, open, onClose }: Props = $props();

let dragOffset = $state(0);
let touchStartY = 0;

function _handleTouchStart(e: TouchEvent) {
	touchStartY = e.touches[0].clientY;
}

function _handleTouchMove(e: TouchEvent) {
	const delta = e.touches[0].clientY - touchStartY;
	dragOffset = Math.max(0, delta);
}

function _handleTouchEnd() {
	if (dragOffset > 120) onClose();
	dragOffset = 0;
}

function _handleBackdropClick(e: MouseEvent) {
	if (e.target === e.currentTarget) onClose();
}
</script>

{#if open}
	<div
		class="backdrop"
		class:visible={open}
		onclick={handleBackdropClick}
		role="presentation"
	>
		<div
			class="panel"
			style="transform: translateY({dragOffset}px)"
			role="dialog"
			aria-label="Información adicional"
			tabindex="-1"
			ontouchstart={handleTouchStart}
			ontouchmove={handleTouchMove}
			ontouchend={handleTouchEnd}
		>
			<div class="handle-row">
				<div class="handle"></div>
			</div>

			<div class="panel-header">
				<span class="panel-title">Información adicional</span>
				<button
					type="button"
					class="close-btn"
					aria-label="Cerrar"
					onclick={onClose}
				>
					<X size={20} />
				</button>
			</div>

			<div class="item-list">
				{#each items as item (item.id)}
					<div class="info-item">
						<div class="item-avatar">{item.icon}</div>
						<div class="item-body">
							<div class="item-author">
								<strong class="author-name">{item.author}</strong>
								{#if item.badge}
									<span class="badge">{item.badge}</span>
								{/if}
							</div>
							<p class="item-text">{item.text}</p>
							<div class="item-actions">
								<button type="button" class="action-btn" aria-label="Me gusta">
									<Heart size={14} />
									<span>{item.likes}</span>
								</button>
								<button
									type="button"
									class="action-btn"
									aria-label="Respuestas"
								>
									<MessageCircle size={14} />
									<span>{item.replies.length}</span>
								</button>
							</div>

							{#if item.replies.length > 0}
								<div class="replies">
									{#each item.replies as reply}
										<div class="reply">
											<div class="reply-avatar">{reply.icon ?? "💬"}</div>
											<div class="reply-body">
												<strong class="reply-author">{reply.author}</strong>
												<p class="reply-text">{reply.text}</p>
												<div class="reply-actions">
													<Heart size={12} />
													<span>{reply.likes}</span>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 20;
		display: flex;
		align-items: flex-end;
		background: rgb(0 0 0 / 42%);
		animation: fade-in 0.15s ease;
	}

	.panel {
		width: 100%;
		max-height: 70vh;
		overflow-y: auto;
		border-radius: 16px 16px 0 0;
		background: #fffaf1;
		color: #151515;
		transition: transform 0.1s linear;
		animation: slide-up 0.25s ease;
	}

	.handle-row {
		display: flex;
		justify-content: center;
		padding: 10px 0 4px;
	}

	.handle {
		width: 36px;
		height: 4px;
		border-radius: 2px;
		background: #d8cfc0;
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 4px 16px 12px;
		border-bottom: 1px solid #d8cfc0;
	}

	.panel-title {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		text-transform: uppercase;
		color: #64615d;
	}

	.close-btn {
		display: grid;
		width: 32px;
		height: 32px;
		place-items: center;
		padding: 0;
		border: 1px solid #d8cfc0;
		border-radius: 50%;
		background: transparent;
		color: #64615d;
		cursor: pointer;
	}

	.item-list {
		padding: 4px 16px 24px;
	}

	.info-item {
		display: flex;
		gap: 12px;
		padding: 14px 0;
		border-bottom: 1px solid #d8cfc0;
	}

	.info-item:last-child {
		border-bottom: none;
	}

	.item-avatar {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: #d9ead9;
		flex-shrink: 0;
		font-size: 1rem;
	}

	.item-body {
		flex: 1;
		min-width: 0;
	}

	.item-author {
		display: flex;
		gap: 8px;
		align-items: baseline;
		margin-bottom: 2px;
	}

	.author-name {
		font-size: 0.88rem;
	}

	.badge {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: #64615d;
	}

	.item-text {
		margin: 0 0 8px;
		font-size: 0.85rem;
		line-height: 1.38;
		color: #151515;
	}

	.item-actions {
		display: flex;
		gap: 16px;
	}

	.action-btn {
		display: inline-flex;
		gap: 6px;
		align-items: center;
		padding: 0;
		border: none;
		background: transparent;
		color: #64615d;
		font-size: 0.75rem;
		cursor: pointer;
	}

	.action-btn :global(svg) {
		color: #64615d;
	}

	.replies {
		margin-top: 10px;
		margin-left: 0;
	}

	.reply {
		display: flex;
		gap: 10px;
		padding: 8px 0 8px 12px;
		border-left: 2px solid #d8cfc0;
		margin-top: 6px;
	}

	.reply:first-child {
		margin-top: 0;
	}

	.reply-avatar {
		font-size: 0.85rem;
		flex-shrink: 0;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.reply-body {
		flex: 1;
		min-width: 0;
	}

	.reply-author {
		font-size: 0.82rem;
	}

	.reply-text {
		margin: 2px 0 4px;
		font-size: 0.8rem;
		color: #151515;
	}

	.reply-actions {
		display: inline-flex;
		gap: 4px;
		align-items: center;
		color: #64615d;
		font-size: 0.7rem;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slide-up {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
