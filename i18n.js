// Internationalization (i18n) translations
const translations = {
    'pt-BR': {
        // Header
        'app.title': '🔔 Monitor de Atividade',
        'app.subtitle': 'Pressione o botão para confirmar sua presença',
        
        // Status
        'status.waiting': 'Aguardando início',
        'status.active': '✓ Ativo',
        'status.late': '⚠️ Check-in atrasado!',
        'status.stopped': 'Monitoramento finalizado',
        'status.pressButton': 'Pressione o botão para iniciar',
        
        // Buttons
        'btn.checkIn': 'Confirmar Presença',
        'btn.stop': 'Finalizar Contagem',
        'btn.save': 'Salvar',
        'btn.calculate': 'Calcular',
        'btn.clearHistory': 'Limpar Histórico',
        'btn.export': 'Exportar',
        
        // Settings
        'settings.title': '⚙️ Configurações',
        'settings.interval': 'Intervalo de Check-in (minutos):',
        'settings.notifications': 'Ativar notificações',
        'settings.language': 'Idioma:',
        
        // Statistics
        'stats.title': '📊 Estatísticas de Atividade',
        'stats.from': 'Calcular estatísticas a partir de:',
        'stats.activeTime': 'Tempo Ativo',
        'stats.inactiveTime': 'Tempo Inativo',
        'stats.totalCheckins': 'Total de Check-ins',
        'stats.lateCheckins': 'Check-ins Atrasados',
        'stats.punctuality': 'Taxa de Pontualidade',
        
        // History
        'history.title': '📋 Histórico de Atividades',
        'history.empty': 'Nenhuma atividade registrada ainda',
        'history.onTime': '✓ No prazo',
        'history.late': '⚠️ Atrasado',
        'history.stopped': '■ Interrompido',
        'history.interval': 'Intervalo',
        
        // Footer
        'footer.lastUpdate': 'Última atualização:',
        
        // Notifications
        'notif.soon.title': 'Check-in em breve',
        'notif.soon.body': 'Faltam 10 segundos para o próximo check-in!',
        
        // Alerts
        'alert.invalidInterval': 'Por favor, insira um intervalo entre 1 e 1440 minutos.',
        'alert.settingsSaved': 'Configurações salvas!',
        'alert.historyCleared': 'Histórico limpo!',
        'alert.confirmClear': 'Tem certeza que deseja limpar todo o histórico?',
        'alert.confirmStop': 'Deseja realmente finalizar a contagem? O timer será parado.',
        'alert.selectStartTime': 'Por favor, selecione uma data e hora de início.',
        'alert.futureDate': 'A data de início não pode ser no futuro.',
        'alert.noRecords': 'Não há registros de atividade no período selecionado.'
    },
    'en': {
        // Header
        'app.title': '🔔 Activity Monitor',
        'app.subtitle': 'Press the button to confirm your presence',
        
        // Status
        'status.waiting': 'Waiting to start',
        'status.active': '✓ Active',
        'status.late': '⚠️ Check-in overdue!',
        'status.stopped': 'Monitoring stopped',
        'status.pressButton': 'Press the button to start',
        
        // Buttons
        'btn.checkIn': 'Confirm Presence',
        'btn.stop': 'Stop Monitoring',
        'btn.save': 'Save',
        'btn.calculate': 'Calculate',
        'btn.clearHistory': 'Clear History',
        'btn.export': 'Export',
        
        // Settings
        'settings.title': '⚙️ Settings',
        'settings.interval': 'Check-in Interval (minutes):',
        'settings.notifications': 'Enable notifications',
        'settings.language': 'Language:',
        
        // Statistics
        'stats.title': '📊 Activity Statistics',
        'stats.from': 'Calculate statistics from:',
        'stats.activeTime': 'Active Time',
        'stats.inactiveTime': 'Inactive Time',
        'stats.totalCheckins': 'Total Check-ins',
        'stats.lateCheckins': 'Late Check-ins',
        'stats.punctuality': 'Punctuality Rate',
        
        // History
        'history.title': '📋 Activity History',
        'history.empty': 'No activity recorded yet',
        'history.onTime': '✓ On time',
        'history.late': '⚠️ Late',
        'history.stopped': '■ Stopped',
        'history.interval': 'Interval',
        
        // Footer
        'footer.lastUpdate': 'Last update:',
        
        // Notifications
        'notif.soon.title': 'Check-in soon',
        'notif.soon.body': '10 seconds until next check-in!',
        
        // Alerts
        'alert.invalidInterval': 'Please enter an interval between 1 and 1440 minutes.',
        'alert.settingsSaved': 'Settings saved!',
        'alert.historyCleared': 'History cleared!',
        'alert.confirmClear': 'Are you sure you want to clear all history?',
        'alert.confirmStop': 'Do you really want to stop monitoring? The timer will be stopped.',
        'alert.selectStartTime': 'Please select a start date and time.',
        'alert.futureDate': 'The start date cannot be in the future.',
        'alert.noRecords': 'No activity records in the selected period.'
    }
};

// Get translation for a key
function t(key) {
    const lang = localStorage.getItem('appLanguage') || 'pt-BR';
    return translations[lang][key] || key;
}

// Apply translations to the page
function applyTranslations() {
    const lang = localStorage.getItem('appLanguage') || 'pt-BR';
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang][key];
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'button') {
                element.value = translation;
            } else if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

// Change language
function changeLanguage(lang) {
    localStorage.setItem('appLanguage', lang);
    applyTranslations();
    
    // Trigger custom event for app to update dynamic content
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}
