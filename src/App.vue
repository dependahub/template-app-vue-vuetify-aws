<script setup>
import { ref } from 'vue';

const theme = ref('dark');
function toggleTheme() {
	theme.value = theme.value === 'dark' ? 'light' : 'dark';
}
</script>

<template>
	<v-app :theme="theme">
		<v-app-bar
			flat
			class="border-b"
			density="compact"
		>
			<v-app-bar-nav-icon />
			<v-toolbar-title>My App</v-toolbar-title>
			<v-spacer />
			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-heart</v-icon>
			</v-btn>
			<!-- Theme: Light or Dark Toggle -->
			<v-btn
				@click="toggleTheme"
				icon
			>
				<v-icon>{{
					theme === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
				}}</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer location="left">
			<v-list density="compact">
				<v-list-subheader>REPORTS</v-list-subheader>

				<v-list-item
					v-for="(item, i) in [
						{ title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
						{ title: 'Users', icon: 'mdi-account', to: '/users' },
						{ title: 'Products', icon: 'mdi-cart', to: '/products' },
						{ title: 'Settings', icon: 'mdi-cog', to: '/settings' },
					]"
					:key="i"
					:title="item.title"
					:to="item.to"
					color="primary"
				>
					<template v-slot:prepend>
						<v-icon :icon="item.icon"></v-icon>
					</template>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-navigation-drawer location="right">
			<v-list>
				<v-list-subheader>NOTIFICATIONS</v-list-subheader>

				<v-list-item
					v-for="(item, i) in [
						{ title: 'Messages', icon: 'mdi-message', to: '/messages' },
						{ title: 'Alerts', icon: 'mdi-bell', to: '/alerts' },
						{ title: 'Activities', icon: 'mdi-run', to: '/activities' },
					]"
					:key="i"
					:title="item.title"
					:to="item.to"
					color="primary"
				>
					<template v-slot:prepend>
						<v-icon :icon="item.icon"></v-icon>
					</template>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<v-container>
				<router-view>
					<h1>Welcone to Dashboard</h1>
				</router-view>
			</v-container>
		</v-main>
	</v-app>
</template>

<style scoped></style>
