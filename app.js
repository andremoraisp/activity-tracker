class ActivityMonitor {
    constructor() {
        this.intervalMinutes = 30;
        this.intervalMs = this.intervalMinutes * 60 * 1000;
        this.lastCheckIn = null;
        this.nextCheckIn = null;
        this.timer = null;
        this.history = [];
        this.notificationsEnabled = false;
        this.notificationSent10Sec = false;
        this.isStopped = false;

        this.init();
    }

    init() {
        this.loadSettings();
        this.loadHistory();
        this.setupEventListeners();
        this.updateDisplay();
        this.requestNotificationPermission();

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js')
                .then(reg => console.log('Service Worker registrado:', reg))
                .catch(err => console.log('Erro ao registrar Service Worker:', err));
        }
    }

    setupEventListeners() {
        document.getElementById('checkInBtn').addEventListener('click', () => this.checkIn());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopMonitoring());
        document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());
        document.getElementById('clearHistory').addEventListener('click', () => this.clearHistory());
        document.getElementById('exportHistory').addEventListener('click', () => this.exportHistory());
        document.getElementById('calculateStats').addEventListener('click', () => this.calculateStatistics());
        document.getElementById('notificationsEnabled').addEventListener('change', (e) => {
            this.notificationsEnabled = e.target.checked;
            if (this.notificationsEnabled) {
                this.requestNotificationPermission();
            }
        });
    }

    loadSettings() {
        const settings = localStorage.getItem('activityMonitorSettings');
        if (settings) {
            const parsed = JSON.parse(settings);
            this.intervalMinutes = parsed.intervalMinutes || 30;
            this.notificationsEnabled = parsed.notificationsEnabled || false;
            this.intervalMs = this.intervalMinutes * 60 * 1000;

            document.getElementById('intervalMinutes').value = this.intervalMinutes;
            document.getElementById('notificationsEnabled').checked = this.notificationsEnabled;
        }

        const lastCheckInStr = localStorage.getItem('lastCheckIn');
        const stoppedStr = localStorage.getItem('monitoringStopped');

        if (lastCheckInStr && !stoppedStr) {
            this.lastCheckIn = new Date(lastCheckInStr);
            this.nextCheckIn = new Date(this.lastCheckIn.getTime() + this.intervalMs);
            document.getElementById('stopBtn').style.display = 'flex';
            this.startTimer();
        } else if (stoppedStr) {
            this.isStopped = true;
        }
    }

    saveSettings() {
        const newInterval = parseInt(document.getElementById('intervalMinutes').value);

        if (newInterval < 1 || newInterval > 1440) {
            alert('Por favor, insira um intervalo entre 1 e 1440 minutos.');
            return;
        }

        this.intervalMinutes = newInterval;
        this.intervalMs = this.intervalMinutes * 60 * 1000;

        const settings = {
            intervalMinutes: this.intervalMinutes,
            notificationsEnabled: this.notificationsEnabled
        };

        localStorage.setItem('activityMonitorSettings', JSON.stringify(settings));

        if (this.lastCheckIn) {
            this.nextCheckIn = new Date(this.lastCheckIn.getTime() + this.intervalMs);
        }

        this.showSuccessMessage();
    }

    checkIn() {
        const now = new Date();
        const wasLate = this.nextCheckIn && now > this.nextCheckIn;

        this.lastCheckIn = now;
        this.nextCheckIn = new Date(now.getTime() + this.intervalMs);
        this.notificationSent10Sec = false;
        this.isStopped = false;

        localStorage.setItem('lastCheckIn', now.toISOString());
        localStorage.removeItem('monitoringStopped');

        this.addToHistory({
            timestamp: now,
            status: wasLate ? 'late' : 'ontime',
            interval: this.intervalMinutes
        });

        const btn = document.getElementById('checkInBtn');
        btn.classList.add('success');
        setTimeout(() => btn.classList.remove('success'), 500);

        document.getElementById('stopBtn').style.display = 'flex';

        this.startTimer();
        this.updateDisplay();
    }

    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    updateDisplay() {
        const now = new Date();

        if (!this.nextCheckIn) {
            document.getElementById('timeRemaining').textContent = '--:--';
            document.getElementById('statusText').textContent = 'Pressione o botão para iniciar';
            document.getElementById('progressFill').style.width = '0%';
            return;
        }

        const remaining = this.nextCheckIn - now;

        if (remaining <= 0) {
            document.getElementById('timeRemaining').textContent = '00:00';
            document.getElementById('timeRemaining').classList.add('danger');
            document.getElementById('statusText').textContent = '⚠️ Check-in atrasado!';
            document.getElementById('progressFill').style.width = '0%';
            return;
        }

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        const timeElement = document.getElementById('timeRemaining');
        timeElement.textContent = timeStr;

        timeElement.classList.remove('warning', 'danger');
        if (remaining < 60000) {
            timeElement.classList.add('danger');
        } else if (remaining < 300000) {
            timeElement.classList.add('warning');
        }

        const progress = ((this.intervalMs - remaining) / this.intervalMs) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;

        if (remaining > 60000) {
            document.getElementById('statusText').textContent = `Próximo check-in em ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
        } else {
            document.getElementById('statusText').textContent = `Próximo check-in em ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
        }

        if (remaining <= 10000 && this.notificationsEnabled && !this.notificationSent10Sec) {
            this.sendNotification('Check-in em breve', 'Faltam 10 segundos para o próximo check-in!');
            this.notificationSent10Sec = true;
        }

        document.getElementById('lastUpdate').textContent = now.toLocaleTimeString('pt-BR');
    }

    addToHistory(entry) {
        this.history.unshift(entry);

        if (this.history.length > 100) {
            this.history = this.history.slice(0, 100);
        }

        localStorage.setItem('activityHistory', JSON.stringify(this.history));
        this.renderHistory();
    }

    loadHistory() {
        const historyStr = localStorage.getItem('activityHistory');
        if (historyStr) {
            this.history = JSON.parse(historyStr);
            this.renderHistory();
        }
    }

    renderHistory() {
        const historyList = document.getElementById('historyList');

        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="empty-state">Nenhuma atividade registrada ainda</p>';
            return;
        }

        historyList.innerHTML = this.history.map(entry => {
            const date = new Date(entry.timestamp);
            let statusText, statusClass;

            if (entry.status === 'stopped') {
                statusText = '■ Interrompido';
                statusClass = 'stopped';
            } else if (entry.status === 'late') {
                statusText = '⚠️ Atrasado';
                statusClass = 'missed';
            } else {
                statusText = '✓ No prazo';
                statusClass = '';
            }

            return `
                <div class="history-item ${statusClass}">
                    <div class="history-item-time">${date.toLocaleString('pt-BR')}</div>
                    <div class="history-item-status">${statusText} - Intervalo: ${entry.interval} min</div>
                </div>
            `;
        }).join('');
    }

    clearHistory() {
        if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
            this.history = [];
            localStorage.removeItem('activityHistory');
            this.renderHistory();
        }
    }

    exportHistory() {
        if (this.history.length === 0) {
            alert('Não há histórico para exportar.');
            return;
        }

        const csv = [
            ['Data/Hora', 'Status', 'Intervalo (min)'],
            ...this.history.map(entry => [
                new Date(entry.timestamp).toLocaleString('pt-BR'),
                entry.status === 'late' ? 'Atrasado' : 'No prazo',
                entry.interval
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `atividades_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async requestNotificationPermission() {
        if ('Notification' in window && this.notificationsEnabled) {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                this.notificationsEnabled = false;
                document.getElementById('notificationsEnabled').checked = false;
            }
        }
    }

    sendNotification(title, body) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: 'icon-192.png',
                badge: 'icon-192.png',
                vibrate: [200, 100, 200]
            });
        }
    }

    showSuccessMessage() {
        const btn = document.getElementById('saveSettings');
        const originalText = btn.textContent;
        btn.textContent = '✓ Salvo!';
        btn.style.background = 'var(--success-color)';
        btn.style.color = 'white';
        btn.style.borderColor = 'var(--success-color)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    }

    stopMonitoring() {
        if (!confirm('Deseja realmente finalizar a contagem? O timer será parado.')) {
            return;
        }

        const now = new Date();

        this.addToHistory({
            timestamp: now,
            status: 'stopped',
            interval: this.intervalMinutes
        });

        this.isStopped = true;
        this.lastCheckIn = null;
        this.nextCheckIn = null;

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        localStorage.setItem('monitoringStopped', 'true');
        localStorage.removeItem('lastCheckIn');

        document.getElementById('stopBtn').style.display = 'none';
        document.getElementById('timeRemaining').textContent = '--:--';
        document.getElementById('statusText').textContent = 'Monitoramento finalizado';
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('timeRemaining').classList.remove('warning', 'danger');
    }

    calculateStatistics() {
        const startTimeInput = document.getElementById('statsStartTime').value;

        if (!startTimeInput) {
            alert('Por favor, selecione uma data e hora de início.');
            return;
        }

        const startTime = new Date(startTimeInput);
        const now = new Date();

        if (startTime > now) {
            alert('A data de início não pode ser no futuro.');
            return;
        }

        const filteredHistory = this.history.filter(entry => {
            const entryTime = new Date(entry.timestamp);
            return entryTime >= startTime && entryTime <= now;
        });

        if (filteredHistory.length === 0) {
            alert('Não há registros de atividade no período selecionado.');
            return;
        }

        const sortedHistory = [...filteredHistory].sort((a, b) =>
            new Date(a.timestamp) - new Date(b.timestamp)
        );

        let activeTimeMs = 0;
        let inactiveTimeMs = 0;
        let totalCheckins = sortedHistory.length;
        let lateCheckins = 0;

        for (let i = 0; i < sortedHistory.length; i++) {
            const entry = sortedHistory[i];
            const checkInTime = new Date(entry.timestamp);
            const intervalMs = entry.interval * 60 * 1000;

            if (entry.status === 'late') {
                lateCheckins++;
            }

            if (entry.status === 'stopped') {
                if (i > 0) {
                    const prevEntry = sortedHistory[i - 1];
                    const prevCheckIn = new Date(prevEntry.timestamp);
                    const prevInterval = prevEntry.interval * 60 * 1000;
                    const timeBetween = checkInTime - prevCheckIn;

                    activeTimeMs += Math.min(timeBetween, prevInterval);
                    if (timeBetween > prevInterval) {
                        inactiveTimeMs += timeBetween - prevInterval;
                    }
                }
                continue;
            }

            if (i === 0) {
                const timeSinceStart = checkInTime - startTime;
                inactiveTimeMs += timeSinceStart;
            } else {
                const prevEntry = sortedHistory[i - 1];
                const prevCheckIn = new Date(prevEntry.timestamp);
                const timeBetween = checkInTime - prevCheckIn;
                const prevInterval = prevEntry.interval * 60 * 1000;

                if (prevEntry.status === 'stopped') {
                    inactiveTimeMs += timeBetween;
                } else {
                    activeTimeMs += Math.min(timeBetween, prevInterval);
                    if (timeBetween > prevInterval) {
                        inactiveTimeMs += timeBetween - prevInterval;
                    }
                }
            }
        }

        const lastEntry = sortedHistory[sortedHistory.length - 1];
        const lastCheckIn = new Date(lastEntry.timestamp);
        const lastInterval = lastEntry.interval * 60 * 1000;
        const timeSinceLastCheckIn = now - lastCheckIn;

        if (lastEntry.status === 'stopped') {
            inactiveTimeMs += timeSinceLastCheckIn;
        } else {
            activeTimeMs += Math.min(timeSinceLastCheckIn, lastInterval);
            if (timeSinceLastCheckIn > lastInterval) {
                inactiveTimeMs += timeSinceLastCheckIn - lastInterval;
            }
        }

        const punctualityRate = totalCheckins > 0
            ? ((totalCheckins - lateCheckins) / totalCheckins * 100).toFixed(1)
            : 0;

        document.getElementById('activeTime').textContent = this.formatDuration(activeTimeMs);
        document.getElementById('inactiveTime').textContent = this.formatDuration(inactiveTimeMs);
        document.getElementById('totalCheckins').textContent = totalCheckins;
        document.getElementById('lateCheckins').textContent = lateCheckins;
        document.getElementById('punctualityRate').textContent = `${punctualityRate}%`;
    }

    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            const remainingHours = hours % 24;
            return `${days}d ${remainingHours}h`;
        } else if (hours > 0) {
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}m`;
        } else if (minutes > 0) {
            const remainingSeconds = seconds % 60;
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${seconds}s`;
        }
    }
}

const monitor = new ActivityMonitor();
